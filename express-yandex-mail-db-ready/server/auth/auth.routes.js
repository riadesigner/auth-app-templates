
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
    (req, res, next)=>{
        const errRedirect = `${process.env.FRONT_URL}/login`;
        passport.authenticate('yandex', {
            session:false,
            failureRedirect:`${errRedirect}?error=auth-failed`,
        })(req, res, err=>{
            // проверка на ошибку, когда jwt устарел 
            if (err) {
                if (err.message.includes('Code has expired')) {
                return res.redirect(`${errRedirect}?error=session_expired`);
                }
                return next(err);
            }
            // ошибок нет, идем дальше
            next();            
        })
    },
    (req, res)=>{        
        // Успешная аутентификация     
        res.redirect(`${process.env.FRONT_URL}/auth-callback?token=${encodeURIComponent(req.user.token)}`);
    }
);


router.get('/mailru/callback', 
    (req, res, next)=>{
        const errRedirect = `${process.env.FRONT_URL}/login`;
        passport.authenticate('mailru', {
            session:false,
            failureRedirect:`${errRedirect}?error=auth-failed`,
        })(req, res, err=>{
            // проверка на ошибку, когда jwt устарел 
            if (err) {
                if (err.message.includes('Code has expired')) {
                return res.redirect(`${errRedirect}?error=session_expired`);
                }
                return next(err);
            }
            // ошибок нет, идем дальше
            next();            
        })
    },
    (req, res)=>{        
        // Успешная аутентификация     
        res.redirect(`${process.env.FRONT_URL}/auth-callback?token=${encodeURIComponent(req.user.token)}`);
    }
);

module.exports = router;