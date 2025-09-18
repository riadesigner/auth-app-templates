function sendSuccess(res, data, statusCode = 200) {
  res.status(statusCode).json({
    success: true,
    ...data,
  });
}

function sendError(res, message, statusCode = 400, details = null) {
  res.status(statusCode).json({
    success: false,
    error: {
      message,
      details,
      statusCode
    }
  });
}

module.exports = { sendSuccess, sendError };