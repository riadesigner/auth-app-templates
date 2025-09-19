const YandexStrategy = require('passport-yandex').Strategy;
const UsersService = require('../resources/users/users.service');
const JWTUtils = require('../utils/jwtUtils');

module.exports = (passport) => {
  
  passport.use(
    new YandexStrategy({
        clientID: process.env.YANDEX_CLIENT_ID,
        clientSecret: process.env.YANDEX_CLIENT_SECRET,
        callbackURL: process.env.YANDEX_CALLBACK_URL,
  }, async (accessToken, refreshToken, profile, done) => {
    try {
      // --------------------
      //  GENERATING PAYLOAD
      // --------------------
      const { id, username, emails, photos, name, gender } = profile;
      
      if (!emails?.[0]?.value) { throw new Error("Email is required"); }

      const userData = {
        yandexId: id,
        email: emails[0].value,
        nickname: username,
        avatar: photos?.[0]?.value,
        firstName: name.familyName,
        secondName: name.givenName,
        middleName:'',
        gender: gender,
        role:'client',                     
      };      

      // ----------------------
      //  searching user in db
      // ----------------------
      let usr = await UsersService.findByEmail(userData.email);

      // ----------------------------------------------
      //  если нет такого пользователя, то создаем его
      // ----------------------------------------------
      if(!usr){
        try{          
          usr = await UsersService.create(userData);          
        }catch(err){          
          throw new AppError(err.message, 500);
        }        
      }

      const payload = { id: usr._id, email: usr.email, role:usr.role };      

      const token = JWTUtils.generateToken(payload, { expiresIn: '2h' });
      console.log('Yandex auth success for:', payload );
              
      process.nextTick(()=>{
          return done(null, { ...usr, token, accessToken });
      })

    } catch (err) {
      console.error('Yandex auth error:', err);
      return done(err.message);
    }

  }));
};