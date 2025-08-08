require('dotenv').config()

// 1. Импорты (в начале файла)
const express = require('express');
const session = require('express-session'); // Добавлено
const passport = require('passport');
const YandexStrategy = require('passport-yandex').Strategy;
const cors = require('cors');
const jwt = require('jsonwebtoken');

// ---------
// CONSTANTS
// ---------
const FRONT_URL = 'http://localhost:5173'; // адрес React-приложения
const PORT = process.env.PORT;
const YANDEX_CLIENT_ID = process.env.YANDEX_CLIENT_ID;
const YANDEX_CLIENT_SECRET = process.env.YANDEX_CLIENT_SECRET;

// ----------------------
//        APP INIT
// ----------------------
const app = express();

// 2. Настройка сессии 
app.use(session({
  secret: process.env.SESSION_SECRET || 'fallback_secret', // Обязательно!
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    httpOnly: true,
    maxAge: 86400000 // 24 часа
  }
}));

// 3. Инициализация Passport (после сессии)
app.use(passport.initialize());
app.use(passport.session());
app.use(require('cookie-parser')())
app.set('view engine','ejs');

app.use(cors({
  origin: FRONT_URL,
  credentials: true,
  methods: ['GET', 'POST', 'OPTIONS']
}));


app.use((req, res, next) => {
  console.log('Session ID:', req.sessionID);
  next();
});

// ------------
// JWT STRATEGY
// ------------
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const jwtOpts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET
};

passport.use(new JwtStrategy(jwtOpts, (jwt_payload, done) => {
    return done(null, jwt_payload.user);
}));

// ----------------------
// PASSPORT CUSTOMIZATION
// ----------------------

passport.serializeUser((user,done)=>{
    done(null, user);
})
passport.deserializeUser((obj,done)=>{
    done(null, obj);
})

passport.use(
    new YandexStrategy({
        clientID: YANDEX_CLIENT_ID,
        clientSecret: YANDEX_CLIENT_SECRET,
        callbackURL: `http://127.0.0.1:${PORT}/auth/yandex/callback`,                
    },
    async (accessToken, refreshToken, profile, done) => {
        try {
            // Валидация данных
            if (!profile.emails?.[0]?.value) {
                throw new Error("Email is required");
            }

            // Формируем пользователя
            const user = {
                id: profile.id,
                email: profile.emails[0].value,
                displayName: profile.displayName,
                avatar: profile.photos?.[0]?.value
            };

            // Генерируем токен
            const token = jwt.sign(
                { 
                    id: user.id,
                    email: user.email,
                    exp: Math.floor(Date.now() / 1000) + 3600 // 1 час
                },
                process.env.JWT_SECRET
            );

            // Для отладки
            console.log('Generated token for:', user.email);

            return done(null, { ...user, token });
        } catch (err) {
            console.error('Yandex auth error:', err);
            return done(err);
        }
    })
);


function isAuthenticated(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/');
};

app.get('/', (req, res)=>{
    const user = req.user;
    const email = user && user.emails && user.emails.length ? user.emails[0].value : null;          
    const avatar = (user && user.photos && user.photos.length>0) ? user.photos[0].value : null;
    res.render('index',{user, avatar, email});
});


app.get('/auth/yandex', 
    passport.authenticate('yandex')
);

app.get('/auth/yandex/callback', 
    passport.authenticate('yandex', { failureRedirect: '/login' }),
    (req, res) => {
        // Токен уже создан в стратегии и доступен в req.user.token


        res.cookie('jwt', req.user.token, {
        httpOnly: true,
        secure: false, // Для localhost development!
        domain: 'localhost', // Явное указание
        sameSite: 'none', // Или 'none' если фронт/бек на разных портах
        maxAge: 3600000
        });        
                
        res.redirect(`${FRONT_URL}/profile`);
    }
);

app.get("/exit", (req, res, next) => {  
    req.logout(req.user, err => {
      if(err) return next(err);    
        req.session.destroy(function (err) {            
          res.redirect('/');
        });
    });
});

app.post('/auth/logout', (req, res) => {
  res.clearCookie('jwt', {
    domain: process.env.COOKIE_DOMAIN || 'localhost',
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production'
  });
  res.status(200).json({ message: 'Logged out' });
});


app.get('/account', 
    isAuthenticated,
    (req, res)=>{
    res.json({user: req.user});
});

app.get('/api/user', (req, res) => {
    const token = req.cookies.jwt;
    if (!token) return res.status(401).json({ isAuthenticated: false });
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        res.json(decoded);
    } catch (err) {
        res.status(401).json({ error: 'Invalid token' });
    }
});

// Проверка аутентификации
app.get('/api/check-auth', (req, res) => {
  console.log('Received cookies:', req.cookies); // Для отладки
  
  const token = req.cookies.jwt;
  if (!token) {
    console.log('No token found in cookies');
    return res.status(401).json({ isAuthenticated: false });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Decoded token:', decoded);
    res.json({ isAuthenticated: true, user: decoded });
  } catch (err) {
    console.error('Token verification failed:', err);
    res.status(401).json({ isAuthenticated: false });
  }
});



app.listen(PORT, ()=>{
    console.log(`server started  http://localhost:${PORT}`);
});




