const passport = require('passport');
const jwtStrategy = require('../strategies/jwt.strategy');
const yandexStrategy = require('../strategies/yandex.strategy');

module.exports = () => {
  // Инициализация стратегий
  jwtStrategy(passport);
  yandexStrategy(passport);

  // Сериализация пользователя
  passport.serializeUser((user, done) => {
    done(null, user);
  });

  passport.deserializeUser((obj, done) => {
    done(null, obj);
  });
};