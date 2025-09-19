
const UsersModel = require('./users.model');
const AppError = require('../../middleware/AppError');
  
exports.findById = async function (id) {
    try{
      const user = await UsersModel
        .findById(id)
      return user;
    }catch(e){        
      return null;
    }
}

exports.update = async function (id, userUpdateDto) {
    const {updatedAt, createdAt, ...data } = userUpdateDto;

    try{
      const userUpdated = await UsersModel.findByIdAndUpdate(
          id,
          data,
          { new: true }
      );                
      return userUpdated;

    }catch(e){
      console.log(`cant find user by id ${id}, err: ${e.message || e}`)
      return null;
    }
}  

exports.create = async function (userData = {}) {  
    try{
      return await UsersModel.create(userData);                   
    }catch(e){
      throw new AppError(e.message || e, 500);
    }   
}  

exports.findByEmail = async function (email) {
    try{
      const user = await UsersModel
        .findOne({email:email})
      return user;
    }catch(e){
      console.log(`cant find user by id ${email}, err:${e.message || e}`)
      return null;
    }
}
