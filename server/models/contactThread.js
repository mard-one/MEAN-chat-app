const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

const Message = require('./message');
const User = require('./user');


var contactThreadSchema = new Schema({
  threadOwner: { type: Schema.Types.ObjectId, ref: 'User' },
  threadOwnerName: { type: String, ref: 'User' },
  usersInContactThread: [{ type: Schema.Types.ObjectId, ref: 'User', default: undefined}]
})

module.exports = mongoose.model('ContactThread', contactThreadSchema);
