require('dotenv').config()

const express = require('express')
const passport = require('passport');
const configurePassport = require('./config/passport');

const PROD_MODE = process.env.NODE_ENV === 'production';

const app = express();
app.use(require('cookie-parser')());

if (PROD_MODE) {
  app.set('trust proxy', 1);
}

app.use(require('express-session')({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: PROD_MODE,
    sameSite: PROD_MODE ? 'none' : 'lax',
    httpOnly: true,
    maxAge: 10 * 60 * 1000
  }
}));

app.set('view engine','ejs');
app.set('trust proxy', 1);
configurePassport();
app.use(passport.initialize());
app.use(passport.session());

app.use('/auth',require('./auth/auth.routes')); // auth через яндекс и mailru  
app.use('/',require('./auth/login.routes')); // разные роуты для логина и выхода

app.get('/', (req, res)=>{
    const user = req.user;
    const email = user && user.emails && user.emails.length ? user.emails[0].value : null;          
    const avatar = (user && user.photos && user.photos.length>0) ? user.photos[0].value : null;
    res.render('index',{user, avatar, email});
});

const PORT = process.env.PORT;
app.listen(PORT, ()=>{
    console.log(`server started  http://localhost:${PORT}`);
});




