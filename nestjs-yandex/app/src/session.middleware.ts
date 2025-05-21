import * as session from 'express-session';

export const sessionMiddleware = session({
  saveUninitialized: false,
  secret: process.env.SESSION_SECRET,
  resave: false,
  cookie: {
    sameSite: true,
    httpOnly: false,
    maxAge: 3600000,
  },
});
