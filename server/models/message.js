const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./user');

var messageSchema = new Schema({
    sender: { type: Schema.Types.ObjectId, ref: 'User' },
    reciever: { type: Schema.Types.ObjectId, ref: 'User' },
    sentAt: { type: Date, default: Date.now },
    text: String,
    isRead: { type: Boolean, default: false }
})

module.exports = mongoose.model('Message', messageSchema);
