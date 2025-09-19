const { Schema, model } = require('mongoose');


const userSchema = new Schema({
    email: { type:String, required:true},
    googleId: { type:String },
    yandexId: { type:String },
    mailruId: { type:String },    
    nickname: { type:String },
    avatar: { type:String },        
    userPhone: { type:String},
    firstName: { type:String },  
    secondName: { type:String },
    middleName: { type:String },
    gender: { type:String },    
    role: { type:String },    
    createdAt: { type:Date },
    updatedAt: { type:Date },
}, {
  timestamps: true,
  toJSON: {
    transform(doc, ret) {
      ret.id = ret._id.toString();
      delete ret._id;
      delete ret.__v;
      return ret;
    }
  }
});
module.exports = model('Users', userSchema);

