const { sendError } = require('./utils/apiHelpers');

module.exports = (req,res)=>{
    sendError(res, 'Not found', 404);
}