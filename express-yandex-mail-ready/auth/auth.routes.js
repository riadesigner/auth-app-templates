
const express = require('express')
const passport = require('passport');
const rnd = require("randomstring");

const router = express.Router();


router.get('/yandex', 
    (req, res, next)=>{
        passport.authenticate('yandex')(req, res, next);
    }
);

router.get('/mailru',    
    (req, res, next)=>{
        passport.authenticate('mailru', {state:rnd.generate(12)})(req, res, next);
    }    
);


router.get('/yandex/callback', 
    passport.authenticate('yandex', {failureRedirect: '/auth-error'}),
    (req, res)=>{
        
        res.redirect('/')
    }
);


router.get('/mailru/callback', 
    passport.authenticate('mailru', {failureRedirect: '/auth-error'}),
    (req, res)=>{
        res.redirect('/')
    }
);


module.exports = router;