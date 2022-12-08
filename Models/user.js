const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({



  email: { type: String, required: true },
  password: { type: String, required: true },
  
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  age: { type: Number, required: true },
  situation: { type: String, required: true },
  

 
  modelmission: [
    { type: mongoose.Schema.Types.ObjectId, ref: 'Mission'}
  ]

},{
  timestamps: true  , versionKey : false 
});
  // userdetails: { type: String, required: true },
  // modelmission: { type: String, required: true },
  //timestamps : true  , versionKey : false 

const User = mongoose.model('User', UserSchema);
module.exports = User
