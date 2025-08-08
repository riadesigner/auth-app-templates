require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');

// ------------
// JWT STRATEGY
// ------------
const jwt = require('jsonwebtoken');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const jwtOpts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET
};
passport.use(new JwtStrategy(jwtOpts, (jwt_payload, done) => {
    return done(null, jwt_payload.user || jwt_payload);
}));

// ---------------
// YANDEX STRATEGY
// ---------------
const YandexStrategy = require('passport-yandex').Strategy;
passport.use(
    new YandexStrategy({
        clientID: process.env.YANDEX_CLIENT_ID,
        clientSecret: process.env.YANDEX_CLIENT_SECRET,
        callbackURL: `http://localhost:${process.env.PORT}/auth/yandex/callback`,
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
                },
                process.env.JWT_SECRET,
                { expiresIn: '15m' }
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

// ----------------------------
//    PASSPORT CUSTOMIZATION
// ----------------------------
passport.serializeUser((user,done)=>{
    done(null, user);
});
passport.deserializeUser((obj,done)=>{
    done(null, obj);
});

// -------------------
//      APP INIT
// -------------------
const app = express();

// Настройка сессии 
app.use(session({
  secret: process.env.SESSION_SECRET || 'fallback_secret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'none',
    httpOnly: true,
    maxAge: 86400000 // 24 часа
  }
}));

app.use(passport.initialize());
app.use(passport.session());

// Настройка CORS для кросс-портовых запросов
const corsOptions = {
  origin: process.env.FRONT_URL, // Фронтенд-адрес
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true,
  allowedHeaders: [
    'Content-Type',
    'Authorization' // Для Bearer token
  ]  
};
app.use(cors(corsOptions));

app.use(cookieParser());
app.use(express.json());
app.set('view engine','ejs');

// Middleware для логирования заголовков (для отладки)
app.use((req, res, next) => {
  console.log('\n=== Новый запрос ===');
  console.log('Session ID:', req.sessionID);
  console.log('Headers:', req.headers);
  console.log('Cookies:', req.cookies);
  next();
});

// ------------
//    ROUTS
// ------------

app.get('/', (req, res)=>{
    const user = req.user;
    res.render('index',{user});
});

// 1. Инициируем OAuth-поток
app.get('/auth/yandex', 
    passport.authenticate('yandex')
);

// 2. Обрабатываем callback от Яндекса
app.get('/auth/yandex/callback', 
  passport.authenticate('yandex', { session: false }),
  (req, res) => {    
    res.redirect(`${process.env.FRONT_URL}/auth-callback?token=${encodeURIComponent(req.user.token)}`);    
  }
);

// 3. Проверка аутентификации (опционально)
app.get('/api/check-auth', 
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    res.json({ 
      isAuthenticated: true,
      user: req.user 
    });
  }
);

// Защищённый роут
app.get('/api/protected', (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    res.json({ secretData: 'Доступ разрешён' });
  } catch (err) {
    res.status(401).json({ error: 'Неверный токен' });
  }
});
// Защищённый роут
app.get('/api/user', 
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        res.json(req.user);
    }
);

app.listen(process.env.PORT, () => {
  console.log(`Сервер запущен на http://localhost:${process.env.PORT}`);
});