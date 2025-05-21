const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../middleware/auth');

// Приватная страница
router.get('/', ensureAuthenticated, (req, res) => {
  res.render('private', { user: req.user });
});

module.exports = router;