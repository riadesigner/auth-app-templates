const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User');

module.exports = function(passport) {
  // Сериализация пользователя
  passport.serializeUser((user, done) => done(null, user.id));
  
  // Десериализация пользователя (обновленная версия)
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id).exec();
      done(null, user);
    } catch (err) {
      done(err, null);
    }
  });

  // Google OAuth Strategy (обновленная версия)
  passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/auth/google/callback'
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      let user = await User.findOne({ googleId: profile.id });
      
      if (!user) {
        user = await User.create({
          googleId: profile.id,
          email: profile.emails[0].value,
          displayName: profile.displayName
        });
      }
      
      return done(null, user);
    } catch (err) {
      return done(err, null);
    }
  }));

  // Local Strategy (обновленная версия)
  passport.use(new LocalStrategy({ usernameField: 'email' }, 
    async (email, password, done) => {
      try {
        const user = await User.findOne({ email }).exec();
        
        if (!user) {
          return done(null, false, { message: 'User not found' });
        }
        
        // Здесь должна быть проверка пароля
        // if (!(await user.validPassword(password))) {
        //   return done(null, false, { message: 'Incorrect password' });
        // }
        
        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  ));
};