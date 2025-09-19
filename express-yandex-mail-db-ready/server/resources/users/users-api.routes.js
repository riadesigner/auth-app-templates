const express = require('express')
const UsersService = require('./users.service')

const passport = require('passport');
const { asyncHandler, sendSuccess, sendError } = require('../../middleware/utils');

const router = express.Router();

// GET /api/users/me                - текущий пользователь (из сессии)
// GET /api/users/:id               - конкретный пользователь
// GET /api/users                   - все пользователи  / не реализована

// PATCH /users/:id                 - обновить данные аутентифицированного пользователя


router.get('/users/me',
    passport.authenticate('jwt', { session: false }),
    asyncHandler(async (req, res) => {         
        const user = await UsersService.findByEmail(req.user.email);        
        if (!user) { return sendError(res, 'User not found', 404); }        
        sendSuccess(res, { user:user.toJSON() });

    })
);

router.get('/users/:id',
    passport.authenticate('jwt', { session: false }),
    asyncHandler(async (req, res) => {         
        const {id} = req.params;
        console.log(`search user ${id}`);
        const user = await UsersService.findById(id);
        if (!user) { return sendError(res, 'User not found', 404); }
        sendSuccess(res, { user:user.toJSON() });
    })
);


router.patch('/users/:id',
    passport.authenticate('jwt', { session: false }),
    asyncHandler(async (req, res) => {        

        const { id } = req.params;        
        const {userData} = req.body;                

        // обновляем пользователя
        if(userData){
            const userUpdated = await UsersService.update(id, userData);
            if (!userUpdated) {
                const errMsg = `Не удалось обоновить данные пользователя ${id}`; 
                return sendError(res, errMsg, 404); 
            }            
        }

        sendSuccess(res, { updatedUser: userUpdated.toJSON() });        
    })
);

module.exports = router;