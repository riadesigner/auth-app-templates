const YandexStrategy = require('passport-yandex').Strategy;
const jwt = require('jsonwebtoken');

module.exports = (passport) => {
  passport.use(new YandexStrategy({
    clientID: process.env.YANDEX_CLIENT_ID,
    clientSecret: process.env.YANDEX_CLIENT_SECRET,
    callbackURL: `http://localhost:${process.env.PORT}/auth/yandex/callback`,
  }, async (accessToken, refreshToken, profile, done) => {
    try {
      if (!profile.emails?.[0]?.value) {
        throw new Error("Email is required");
      }

      const user = {
        id: profile.id,
        email: profile.emails[0].value,
        displayName: profile.displayName,
        avatar: profile.photos?.[0]?.value
      };

      console.log('profile', profile);
      
      const token = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: '15m' }
      );

      console.log('Yandex auth success for:', user.email);
      return done(null, { ...user, token });
    } catch (err) {
      console.error('Yandex auth error:', err);
      return done(err);
    }
  }));
};