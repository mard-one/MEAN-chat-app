const router = require('express').Router();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const config = require('../config');


const User = require('../models/user');
const Message = require('../models/message');
const MessageThread = require('../models/messageThread');
const ContactThread = require('../models/contactThread');

router.use(function(req, res, next){
  console.log("req.headers['authorization'] thread", req.headers['authorization'])
  const token = req.headers['authorization'];
  if(!token){
    res.json({ success: false, message: "No token provided"})
  } else {
    jwt.verify(token, config.secret, (err, decoded)=>{
      if (err){
        res.json({ success: false, message: "Token invalid: " + err})
      } else {
        req.decoded = decoded
        // console.log("decoded",req.decoded)
        next()
      }
    })
  }
})

router.post("/setCurrentThread", function(req, res){
  if(!req.body){
    res.json({success: false, message: "No user chosen"})
  } else {
    MessageThread.findOne({chatBetween: { $all: [req.decoded.userId, req.body._id]}}, "chatBetween messages")
    .populate({path: "chatBetween messages", populate: {path: "reciever sender", select: "username"}})
    .exec(function(err, foundMessageThread){
      if(err){
        res.json({success: false, message: "Error occured" + err})
      } else {
        if(!foundMessageThread){
          User.findById(req.body._id, "username").exec(function(err, data){
            res.json({success: true, message: "User chosen", currentUser: {username: data.username, id: data._id}})
          })
        } else {
          User.findById(req.body._id, "username").exec(function(err, data){
            res.json({success: true, message: "User with message thread chosen", currentUser: {username: data.username, id: data._id, messages: foundMessageThread.messages}})
          })
        }
      }
    })
  }

})

router.get("/getAllMessageThread", function(req, res){
  User.findById(req.decoded.userId, {select: "messageThread"})
  .populate({path: "messageThread", select:"chatBetween lastMessage messages", populate:{ path: "chatBetween messages", match: { _id:{$ne:req.decoded.userId}}, select: "username avatar isRead"}})
  .exec(function(err, data){
    res.json({message: "Users in message thread", users: data})
  })
})




module.exports = router
