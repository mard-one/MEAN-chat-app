const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

const Message = require('./message');
const User = require('./user');


var messageThreadSchema = new Schema({
    chatBetween: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    messages: [{ type: Schema.Types.ObjectId, ref: 'Message' }],
    lastMessage: {type: String}
})

module.exports = mongoose.model('MessageThread', messageThreadSchema);
