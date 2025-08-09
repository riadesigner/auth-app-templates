const jwt = require('jsonwebtoken');
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');

module.exports = (passport) => {
  const jwtOpts = {
    jwtFromRequest: ExtractJwt.fromExtractors([
      ExtractJwt.fromAuthHeaderAsBearerToken(),
      (req) => req?.cookies?.jwt,
      (req) => req?.query?.token
    ]),
    secretOrKey: process.env.JWT_SECRET
  };

  passport.use(new JwtStrategy(jwtOpts, (jwt_payload, done) => {
    try {
      return done(null, jwt_payload.user || jwt_payload);
    } catch (err) {
      return done(err);
    }
  }));
};