const passport = require('passport');
const jwtStrategy = require('../strategies/jwt.strategy');
const yandexStrategy = require('../strategies/yandex.strategy');
const mailruStrategy = require('../strategies/mailru.strategy');

module.exports = (app) => {
  
    // Инициализация стратегий
    jwtStrategy(passport);
    yandexStrategy(passport);
    mailruStrategy(passport);    

    // Сериализация пользователя
    passport.serializeUser((user, done) => {
        done(null, user);
    });

    passport.deserializeUser((obj, done) => {
        done(null, obj);
    });

    app.use(passport.initialize());
    app.use(passport.session());    

};