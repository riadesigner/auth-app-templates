
const express = require('express')
const passport = require('passport');
const rnd = require("randomstring");

const router = express.Router();


router.get('/yandex', 
    passport.authenticate('yandex')
);

router.get('/mailru',    
    (req, res, next)=>{
        passport.authenticate('mailru', {state:rnd.generate(12)})(req, res, next);
    }    
);


router.get('/yandex/callback', 
    passport.authenticate('yandex', {failureRedirect: '/'}),
    (req, res)=>{
        
        res.redirect('/')
    }
);


router.get('/mailru/callback', 
    passport.authenticate('mailru', {failureRedirect: '/'}),
    (req, res)=>{
        res.redirect('/')
    }
);


module.exports = router;