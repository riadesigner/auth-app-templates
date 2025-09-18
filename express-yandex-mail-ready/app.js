require('dotenv').config()

const express = require('express')
const passport = require('passport');
const configurePassport = require('./config/passport');


const app = express();
app.use(require('cookie-parser')())
app.use(require('express-session')({    
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,   
    // cookie: { secure: true }
}))

app.set('view engine','ejs');
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




