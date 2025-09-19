const MailruStrategy = require('passport-mailru-email').Strategy;
// const usersService = require('../users/users.service');
const JWTUtils = require('../utils/jwtUtils');

module.exports = (passport) => {
  
  passport.use(
    new MailruStrategy({
        clientID: process.env.MAILRU_CLIENT_ID,
        clientSecret: process.env.MAILRU_CLIENT_SECRET,
        callbackURL: process.env.MAILRU_CALLBACK_URL,
  }, async (accessToken, refreshToken, profile, done) => {
    try {
      // --------------------
      //  GENERATING PAYLOAD
      // --------------------
      const { id, username, emails, photos, name, gender } = profile;
      
      if (!emails?.[0]?.value) { throw new Error("Email is required"); }

      const userData = {
        mailruId: id,
        email: emails[0].value,
        name: username,
        avatar: photos?.[0]?.value        
      };      
      const userInfo = {
        firstName: name.familyName,
        secondName: name.givenName,
        gender: gender,     
      }

      // ----------------------
      //  searching user in db
      // ----------------------
      // let usr = await usersService.findByEmail(userData.email);

      // ----------------------------------------------
      //  если нет такого пользователя, то создаем его
      // ----------------------------------------------
      // if(!usr){
      //   try{
      //     userData.role = 'unknown';
      //     console.log( `пользователь ${userData.email} не найден, будет создан новый`);
      //     usr = await usersService.create(userData, userInfo);
      //     console.log('создан newUser = ', usr);      
      //   }catch(err){
      //     console.log('err:', err);
      //     return done('не удалось создать пользователя');          
      //   }        
      // }

      const usr = {
        id:`${userData.mailruId}_${userData.email}`,
        email:userData.email,
        role:'client'
      }

      const payload = { id: usr.id, email: usr.email, role:usr.role };      

      const token = JWTUtils.generateToken(payload, { expiresIn: '2h' });
      console.log('Mailru auth success for:', payload );
              
      process.nextTick(()=>{
          return done(null, { ...usr, token, accessToken });
      })

    } catch (err) {
      console.error('Mailru auth error:', err);
      return done(err.message);
    }

  }));
};