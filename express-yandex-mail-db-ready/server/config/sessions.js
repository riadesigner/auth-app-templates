
module.exports = (app) => {
  
    const PROD_MODE = process.env.NODE_ENV === 'production';
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

};