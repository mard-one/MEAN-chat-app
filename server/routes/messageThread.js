const router = require("express").Router();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const config = require("../config");

const Verify = require("./middleware/authentication");

const customModelsModules = require("../models");

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
  customModelsModules.User
    .findById(req.decoded.user_id)
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
      res.json({ messageThread: data.messageThread });
    });
});


router.post("/removeUnreadMessage", function(req, res) {
  if(req.body.group){
    var messageIds = req.body.group.messages.map(message => {
      return message._id;
    });
    console.log("messageIds", messageIds);
    console.log("req.body.currentUser._id", req.body.currentUser._id);
    customModelsModules.Message.update({ _id: { $in: messageIds }, sender: {$ne: req.body.currentUser._id} }, { $set: { isRead: true } }, { multi: true }).exec(
      (err, updatedMessage) => {
        console.log("remove unread messages updatedMessage", updatedMessage);
        res.json({success: true, message: "Unread messages removed"})          
      }
    );
  }else{
     var messageIds = req.body.messageThread.messages.map(message => {
       return message._id;
     });
     console.log("messageIds", messageIds);
     customModelsModules.Message.update({ _id: { $in: messageIds }, reciever: req.body.currentUser._id }, { $set: { isRead: true } }, { multi: true }).exec(
       (err, updatedMessage) => {
        console.log("remove unread messages updatedMessage", updatedMessage);
        res.json({success: true, message: "Unread messages removed"})             
       }
     );
  }
   
});

module.exports = router;
