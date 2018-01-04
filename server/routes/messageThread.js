const router = require("express").Router();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const config = require("../config");

const Verify = require("./middleware/authentication");

const User = require("../models/user");
const Message = require("../models/message");
const MessageThread = require("../models/messageThread");
const ContactThread = require("../models/contactThread");

// router.use(function(req, res, next) {
//   console.log(
//     "req.headers['authorization'] thread",
//     req.headers["authorization"]
//   );
//   const token = req.headers["authorization"];
//   if (!token) {
//     res.json({ success: false, message: "No token provided" });
//   } else {
//     jwt.verify(token, config.secret, (err, decoded) => {
//       if (err) {
//         res.json({ success: false, message: "Token invalid: " + err });
//       } else {
//         req.decoded = decoded;
//         // console.log("decoded",req.decoded)
//         next();
//       }
//     });
//   }
// });

// router.post("/setCurrentThread", Verify, function(req, res) {
//   if (!req.body) {
//     res.json({ success: false, message: "No user chosen" });
//   } else {
//     MessageThread.findOne(
//       { chatBetween: { $all: [req.decoded.userId, req.body._id] } },
//       "chatBetween messages"
//     )
//       .populate({
//         path: "chatBetween messages",
//         populate: { path: "reciever sender", select: "username" }
//       })
//       .exec(function(err, foundMessageThread) {
//         if (err) {
//           res.json({ success: false, message: "Error occured" + err });
//         } else {
//           if (!foundMessageThread) {
//             User.findById(req.body._id, "username").exec(function(err, data) {
//               res.json({
//                 success: true,
//                 message: "Message thread not found",
//                 messageThread: null
//               });
//             });
//           } else {
//             User.findById(req.body._id, "username").exec(function(err, data) {
//               res.json({
//                 success: true,
//                 message: "Message thread found",
//                 messageThread: foundMessageThread
//               });
//             });
//           }
//         }
//       });
//   }
// });
// router.post("/setCurrentThread", Verify, function(req, res) {

router.get("/getAllMessageThread", Verify, function(req, res) {
  // console.log("getAllMessageThread works");
  User.findById(req.decoded.user_id)
    .populate({
      path: "messageThread", // select: "-password -contactThread",
      populate: [
        {
          path: "chatBetween",
          match: { _id: { $ne: req.decoded.user_id } },
          select: "username avatar"
        },
        { path: "messages" }
      ]
    })
    .exec(function(err, data) {
      res.json({
        messageThread: data.messageThread
      });
    });
});


router.post("/removeUnreadMessage", function(req, res) {
  // console.log("MessageThread");
  console.log("req.body", req.body);
    var messageIds = req.body.messageThread.messages.map(message=>{
      return message._id
    })
    console.log("messageIds", messageIds);
    Message.update({ _id: {$in: messageIds }, reciever: req.body.currentUser._id }, {$set: {isRead: true}}, {multi: true}).exec((err,updatedMessage)=>{
      console.log("updatedMessage", updatedMessage);
    });
    // MessageThread.findById(req.body._id).populate({path: "messages"}).exec((err, foundMessageThread)=>{
    //   var filteredIsRead = foundMessageThread.messages.map(message => {
    //     return Object.assign({}, message.toObject(), { isRead: true });
    //   });
    //   console.log("filteredIsRead", filteredIsRead);
    //   // var properMessages = Object.assign(
    //   //   {},
    //   //   foundMessageThread.toObject(),
    //   //   {
    //   //     messages: filteredIsRead
    //   //   }
    //   // );
    //   // console.log("properMessages", properMessages);
    //   foundMessageThread.messages = filteredIsRead;
    //   foundMessageThread.save((err, done)=>{
    //     console.log("done", done);
    //   })
    // })
  // MessageThread.findById(req.body._id, function(err, foundMessageThread) {
  //   MessageThread.populate(
  //     foundMessageThread,
  //     {
  //       path: "messages"
  //     },
  //     function(err, messages) {
  //       console.log("messages", messages);
  //     }
  //   );
  //   console.log("foundMessageThread", foundMessageThread);
  //   console.log("foundMessageThread.messages", foundMessageThread.messages);

  //   var filteredIsRead = foundMessageThread.messages.map(message => {
  //     return Object.assign({}, message, {
  //       isRead: true
  //     });
  //   });
  //   console.log("filteredIsRead", filteredIsRead);
  //   var filteredMessages = Object.assign(
  //     [],
  //     foundMessageThread.messages,
  //     filteredIsRead
  //   );
  //   console.log("filteredMessages", filteredMessages);
  //   var properMessages = Object.assign({}, foundMessageThread, {
  //     messages: filteredMessages
  //   });
  //   console.log("properMessages", properMessages);
  //   // foundMessageThread = properMessages;
  //   // foundMessageThread.save((err, done) => {
  //   //   console.log("done", done);
  //   // });
  // })

  // MessageThread.findByIdAndUpdate(req.body._id, {
  //   $set: { "messages.$.isRead": true }
  // })
  //   .populate({ path: "messages" })
  //   .exec((err, foundMessageThread) => {});
});

module.exports = router;
