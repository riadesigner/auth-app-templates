require('dotenv').config()

const express = require('express')
const passport = require('passport');
const MailruStrategy = require('passport-mailru-email').Strategy;
const rnd = require("randomstring");


const MAILRU_CLIENT_ID = process.env.MAILRU_CLIENT_ID;
const MAILRU_CLIENT_SECRET = process.env.MAILRU_CLIENT_SECRET;
const MAILRU_CALLBACK_URL = process.env.MAILRU_CALLBACK_URL;


function isAuthenticated(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/');
};

passport.serializeUser((user,done)=>{
    done(null, user);
});
passport.deserializeUser((obj,done)=>{
    done(null, obj);
});

const SERCRET_RANDOM_STRING = rnd.generate(12);

console.log('SERCRET_RANDOM_STRING', SERCRET_RANDOM_STRING);;

passport.use(
    new MailruStrategy({
        clientID: MAILRU_CLIENT_ID,
        clientSecret: MAILRU_CLIENT_SECRET,
        callbackURL: MAILRU_CALLBACK_URL,
        state: SERCRET_RANDOM_STRING,
    },
    (accessToken, refreshToken, profile, done) => {
        process.nextTick(()=>{            
            return done(null, profile);            
        })
    })
);

const app = express();
app.use(require('cookie-parser')())
app.use(require('express-session')({    
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,    
}))

app.set('view engine','ejs');
app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res)=>{
    const user = req.user;
    const email = user && user.emails && user.emails.length ? user.emails[0].value : null;          
    const avatar = (user && user.photos && user.photos.length>0) ? user.photos[0].value : null;
    res.render('index',{user, avatar, email});
});

app.get('/account', 
    isAuthenticated,
    (req, res)=>{
    res.json({user: req.user});
});

app.get('/auth/mailru', 
    passport.authenticate('mailru')
);

app.get('/auth/mailru/callback', 
    passport.authenticate('mailru', {failureRedirect: '/'}),
    (req, res)=>{
        res.redirect('/')
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
  

const PORT = process.env.PORT;
app.listen(PORT, ()=>{
    console.log(`server started  http://localhost:${PORT}`);
});




