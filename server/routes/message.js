// const router = require('express').Router();
// const mongoose = require('mongoose');
// const jwt = require('jsonwebtoken');
// const config = require('../config');
//
//
// const User = require('../models/user');
// const Message = require('../models/message');
// const MessageThread = require('../models/messageThread');
// const ContactThread = require('../models/contactThread');
//
// router.use(function(req, res, next){
//   console.log("req.headers['authorization'] message", req.headers['authorization'])
//   const token = req.headers['authorization'];
//   if(!token){
//     res.json({ success: false, message: "No token provided"})
//   } else {
//     jwt.verify(token, config.secret, (err, decoded)=>{
//       if (err){
//         res.json({ success: false, message: "Token invalid: " + err})
//       } else {
//         req.decoded = decoded
//         // console.log("decoded",req.decoded)
//         next()
//       }
//     })
//   }
// })

// router.post("/sendMessage", function(req, res){
//   let message = new Message({
//     _id: new mongoose.Types.ObjectId(),
//     sender: mongoose.Types.ObjectId(req.decoded.userId),
//     reciever: mongoose.Types.ObjectId(req.body.reciever),
//     text: req.body.message
//   })
//   message.save(function(err, newMessage){
//     if (err) throw err
//     // console.log("newMessage", newMessage)
//   })
//   // console.log("message", message)
//   // res.json({"req.decoded.userId": req.decoded.userId, "req.body.reciever": req.body.reciever})
//   MessageThread.findOne({chatBetween: {$all: [mongoose.Types.ObjectId(req.decoded.userId), mongoose.Types.ObjectId(req.body.reciever),]}})
//   .exec((err, foundMessageThread)=>{
//     if(err){
//       res.json({message: "Unknown err" + err})
//     }else {
//       if(!foundMessageThread){
//         // res.json({ message: "Message thread not found", message: message})
//
//         let messageThread = new MessageThread({
//           _id: new mongoose.Types.ObjectId(),
//           chatBetween: [mongoose.Types.ObjectId(req.decoded.userId), mongoose.Types.ObjectId(req.body.reciever)],
//           messages: [message._id],
//         })
//         messageThread.save(function(err, newMessageThread){
//           MessageThread.findByIdAndUpdate(newMessageThread._id, {lastMessage: message.text}, {new: true})
//           .exec(function(err, updatedMessageThread){
//             res.json({ message: "Message thread was created and message was sent", updatedMessageThread: updatedMessageThread})
//           })
//         })
//       } else{
//         // res.json({"foundMessageThread": foundMessageThread})
//         foundMessageThread.messages.push(message._id)
//         foundMessageThread.lastMessage = message.text
//         foundMessageThread.save(function(err, updatedMessageThread){
//           res.json({message: "Message was sent", updatedMessageThread: updatedMessageThread})
//         })
//
//       }
//     }
//
//   })
//
// })
//
// router.get("/test", function(req, res){
//   req.io.on('echo', {text: "Hellow"});
//   res.send()
// })
// 
//
// module.exports = router
