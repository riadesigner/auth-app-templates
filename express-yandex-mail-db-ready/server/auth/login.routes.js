const express = require('express')
const router = express.Router();

function isAuthenticated(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/');
};

router.get('/auth-error',     
    (req, res)=>{
    res.json({
        error: 'Authentication error',
    });
});

router.get('/account', 
    isAuthenticated,
    (req, res)=>{
    res.json({user: req.user});
});

router.get("/exit", (req, res, next) => {  
    req.logout(err=>{
        if(err) return next(err);
        req.session.destroy(err=>{
            res.clearCookie('connect.sid');
            res.redirect('/');
        });
    });
}); 
  
module.exports = router;
