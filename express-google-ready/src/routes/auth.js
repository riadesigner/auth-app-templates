const express = require('express');
const passport = require('passport');
const router = express.Router();

// Главная страница
router.get('/', (req, res) => {
  res.render('index', { user: req.user });
});

// Страница входа
router.get('/login', (req, res) => {
  res.render('login', { message: req.flash('error') });
});

// Google аутентификация
router.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

// Google callback
router.get('/auth/google/callback',
  passport.authenticate('google', { 
    successRedirect: '/private',
    failureRedirect: '/login',
    failureFlash: true
  })
);

// Выход
router.get('/logout', (req, res) => {
  req.logout(() => {
    res.redirect('/');
  });
});

module.exports = router;