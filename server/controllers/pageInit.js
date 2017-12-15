const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const Message = require('../models/message');
const MessageThread = require('../models/messageThread');
const ContactThread = require('../models/contactThread');


module.exports = PageInit = (req, res)=>{
  User.findById(req.decoded.user_id, '-password').populate({path: "contactThread messageThread", populate:{path: "usersInContactThread", select:"-password -contactThread -messageThread"}}).exec((err, user)=>{
    res.json({success: true, message: "Hello " + user.username, userData: user})
  })
}
