const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');



const Message = require('./message');
const ContactThread = require('./messageThread');
const MessageThread = require('./contactThread');

// let usernameLengthChecker = (username) => {
//   if (!username){
//     return false;
//   } else {
//     if (username.length < 3 || username.length > 15){
//       return false;
//     } else {
//       return true;    }
//   }
// };
// let validUsernameChecker = (username) => {
//   if (!username) {
//     return false;
//   } else {
//     const regExp = new RegExp(/^[a-zA-Z\-]+$/);
//     return regExp.test(username);
//   }
// };
// let passwordLengthChecker = (password) => {
//   if (!password){
//     return false;
//   } else {
//     if (password.length < 8 || password.length > 35){
//       return false;
//     } else {
//       return true;
//     }
//   }
// };
// let validPasswordChecker = (password) => {
//   if (!password) {
//     return false;
//   } else {
//     const regExp = new RegExp(/^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{0,}$/);
//     return regExp.test(password);
//   }
// };
// const passwordValidators = [
//   {
//   validator: passwordLengthChecker,
//   message: 'Password must contain at least 8 charecters but no more than 35'
//   },
//   {
//     validator: validPasswordChecker,
//     message: "Password must not have any special charecters"
//   }
// ];
// const usernameValidators = [
//   {
//   validator: usernameLengthChecker,
//   message: 'Username must contain at least 3 charecters but no more than 15'
//   },
//   {
//     validator: validUsernameChecker,
//     message: "Username must not have any special charecters"
//   }
// ];

var userSchema = new Schema({
  username: {type: String},
  password: {type: String},
  avatar: String,
  messageThread: [{ type: Schema.Types.ObjectId, ref: 'MessageThread' }],
  contactThread: { type: Schema.Types.ObjectId, ref: 'ContactThread'}
})

userSchema.pre('save', function(next){
  if(!this.isModified('password')){
    return next();
  } else {
    bcrypt.hash(this.password, null, null, (err, hash) => {
      if (err){
        return(err);
      } else {
        this.password = hash;
        next();
      }
    });
  };
});

userSchema.methods.comparePassword = function(password){
  return bcrypt.compareSync(password, this.password)
}

module.exports = mongoose.model('User', userSchema);
