// utils/jwtUtils.js
const jwt = require('jsonwebtoken');

class JWTUtils {
  
  static generateToken(user, options = {}) {
    const {
      expiresIn = '1h',
      secret = process.env.JWT_SECRET
    } = options;

    const payload = {
      id: user.id,
      email: user.email,
      role: user.role,
      // Добавляем timestamp для дополнительной безопасности
      iat: Math.floor(Date.now() / 1000)
    };

    return jwt.sign(payload, secret, { expiresIn });
  }

  static verifyToken(token, secret = process.env.JWT_SECRET) {
    try {
      return jwt.verify(token, secret);
    } catch (error) {
      throw new Error('Invalid or expired token');
    }
  }

  static decodeToken(token) {
    return jwt.decode(token);
  }
}

module.exports = JWTUtils;