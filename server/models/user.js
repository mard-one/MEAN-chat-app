const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

const Message = require('./message');
const ContactThread = require('./messageThread');
const MessageThread = require('./contactThread');
const Group = require('./group');

var userSchema = new Schema({
  username: { type: String },
  password: { type: String },
  avatar: { type: String, default: "defaultUser.svg" },
  messageThread: [{ type: Schema.Types.ObjectId, ref: "MessageThread" }],
  contactThread: { type: Schema.Types.ObjectId, ref: "ContactThread" },
  groups: [{ type: Schema.Types.ObjectId, ref: "Group" }]
});

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
