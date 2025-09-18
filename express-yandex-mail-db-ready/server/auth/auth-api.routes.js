const express = require('express')
const router = express.Router();
const passport = require('passport');
const { asyncHandler, sendSuccess, sendError } = require('../middleware/utils');
// const UsersService = require('../users/users.service');
const JWTUtils = require('../utils/jwtUtils');

// Проверка аутентификации (опционально)
router.get('/auth/check-auth', 
  passport.authenticate('jwt', { session: false }),
  asyncHandler((req, res) => {
    sendSuccess(res, {
      isAuthenticated: true,
      user: req.user 
    });
  }
));

// router.get('/auth/new-token', 
//   passport.authenticate('jwt', { session: false }),
//   asyncHandler(async (req, res) => {    
//     const user = await UsersService.findById(req.user.id);    
//     if(!user){
//       return sendError(res, `User ${user._id} not found`, 404);
//     }
//     const payload = { id:user._id, email:user.email, role:user.role }
//     const token = JWTUtils.generateToken(payload, { expiresIn: '15m' });
//     sendSuccess(res, {token});    
//   }
// ));

router.post('/auth/logout', 
  passport.authenticate('jwt', { session: false }),
  asyncHandler((req, res) => {
    // Здесь можно:
    // 1. Добавить токен в blacklist
    // 2. Записать лог выхода
    // 3. Очистить refresh-токен (если используется)    
    sendSuccess(res, {
      message: 'Logged out',
    });    
  }
));

module.exports = router;