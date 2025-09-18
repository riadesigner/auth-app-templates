const requestLogger = (req, res, next) => {
  console.log('=== Новый запрос ===');
//   console.log('Session ID:', req.sessionID);
  // console.log('Headers / referer:', req.headers.referer);
  //console.log('Cookies:', req.cookies);
  console.log(req.url, req.method, req.params, req.query, req.body)
  next();
};

module.exports = requestLogger;