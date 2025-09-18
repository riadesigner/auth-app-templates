function getAuthErrorCode(err, status) {
  if (!status || status >= 500) return 'server_error';

  if (status === 401) {
    if (err.message && err.message.toLowerCase().includes('token expired')) return 'session_expired';
    return 'unauthorized';
  }
  if (status === 403) return 'forbidden';

  if (err.code === 'OAuthError' || (err.message && err.message.toLowerCase().includes('oauth'))) {
    return 'oauth_fail';
  }

  return `auth_${status}`;
}

function authErrorHandler(err, req, res, next) {
  console.error('Auth error:', err);

  const status = res.statusCode && res.statusCode !== 200
    ? res.statusCode
    : (err.status || 500);

  if (status >= 500) {
    return res.redirect(`http://localhost:5173?err=server_error`);
  }

  const errorCode = getAuthErrorCode(err, status);
  return res.redirect(`http://localhost:5173/login?err=${errorCode}`);
}

function apiErrorHandler(sendError) {
  // sendError — функция, которая форматирует ответ (подключаем из index.js или другого места)
  return (err, req, res, next) => {

    const status = err.status || (res.statusCode !== 200 ? res.statusCode : 500);
    console.log('status',status)

    sendError(
      res,
      status >= 500 ? 'Internal server error' : err.message || 'Error',      
      status,
      process.env.NODE_ENV === 'development' ? err.stack : null
    );
  };
}

function fallbackErrorHandler(err, req, res, next) {
  console.error('Unhandled error:', err.stack);
  res.status(500).send('Unexpected error');
}

module.exports = {
  authErrorHandler,
  apiErrorHandler,
  fallbackErrorHandler,
};
