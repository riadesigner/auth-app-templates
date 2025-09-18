const passport = require('passport');
// const jwtStrategy = require('../strategies/jwt.strategy');
// const yandexStrategy = require('../strategies/yandex.strategy');

const YandexStrategy = require('passport-yandex').Strategy;
const MailruStrategy = require('passport-mailru-email').Strategy;
module.exports = () => {
  
    // Инициализация стратегий

    //   jwtStrategy(passport);
    //   yandexStrategy(passport);

    console.log('process.env.YANDEX_CALLBACK_URL', process.env.YANDEX_CALLBACK_URL)
    // ----------------------------
    //    YANDEX AUTHENTICATION
    // ----------------------------
    passport.use(
        new YandexStrategy({
            clientID: process.env.YANDEX_CLIENT_ID,
            clientSecret: process.env.YANDEX_CLIENT_SECRET,
            callbackURL: process.env.YANDEX_CALLBACK_URL,
        },
        (accessToken, refreshToken, profile, done) => {
            process.nextTick(()=>{
                return done(null, profile);
            })
        })
    );

    // ----------------------------
    //    MAIL.RU AUTHENTICATION
    // ----------------------------
    passport.use(
        new MailruStrategy({
            clientID: process.env.MAILRU_CLIENT_ID,
            clientSecret: process.env.MAILRU_CLIENT_SECRET,
            callbackURL: process.env.MAILRU_CALLBACK_URL,
        },
        (accessToken, refreshToken, profile, done) => {
            process.nextTick(()=>{            
                return done(null, profile);            
            })
        })
    );

    // Сериализация пользователя
    passport.serializeUser((user, done) => {
    done(null, user);
    });

    passport.deserializeUser((obj, done) => {
    done(null, obj);
    });

};