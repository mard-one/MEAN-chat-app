const router = require("express").Router();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const config = require("../config");

const User = require("../models/user");
const Message = require("../models/message");
const MessageThread = require("../models/messageThread");
const ContactThread = require("../models/contactThread");

const Verify = require("./middleware/authentication");

router.post("/addContact", Verify, function(req, res) {
  User.findOne({ username: req.body.username }, "username messageThread avatar")
  .exec((err, newUser)=>{
    if (err) {
          res.json({ success: false, message: "Error occured" + err });
        } else {
          if (!newUser) {
            res.json({ success: false, message: "User not found" });
          } else {
            if (newUser._id == req.decoded.user_id) {
              res.json({ success: false, message: "You cannot add yourself" });
            } else {
              ContactThread.findOneAndUpdate(
                { threadOwner: req.decoded.user_id },
                { $addToSet: { contacts: newUser._id } },
                { sort: "contacts", new: true }
              )
                .populate({ path: "contacts", select: "-password -contactThread" })
                .exec(function(err, data) {
                  if (err) return handleError(err);
                  res.json({
                    success: true,
                    user: newUser
                  });
                });
            }
          }
        }
  })
});

router.get("/getAllContacts", Verify, function(req, res) {
  User.findOne({ _id: req.decoded.user_id })
    .populate({
      path: "contactThread",
      populate: {
        path: "contacts",
        select: "username avatar messageThread",
        populate: {
          path: "messageThread",
          match: { chatBetween: req.decoded.user_id },
          populate: [{
            path: "chatBetween",
            match: { _id: { $ne: req.decoded.user_id } },
            select: "username"
          },
          {
            path: "messages"
          }
        ]
        }
      }
    })
    .exec(function(err, data) {
      if (err) throw err;
      res.json({ success: true, contactThread: data.contactThread.contacts });
    });
});

module.exports = router;