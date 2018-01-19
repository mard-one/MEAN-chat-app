const router = require("express").Router();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const config = require("../config");

const Verify = require("./middleware/authentication");
const customModelsModules = require("../models");


router.post("/addContact", Verify, function(req, res) {
  customModelsModules.User
    .findOne({ username: req.body.username }, "username messageThread avatar")
    .populate({
      path: "messageThread",
      populate: [{ path: "chatBetween" }, { path: "messages" }]
    })
    .exec((err, newUser) => {
      console.log("newUser", newUser);
      if (err) {
        res.json({
          success: false,
          message: "Error occured with user that you are adding"
        });
      } else {
        if (!newUser) {
          res.json({ success: false, message: "User not found" });
        } else {
          if (newUser._id == req.decoded.user_id) {
            res.json({ success: false, message: "You cannot add yourself" });
          } else {
            console.log('req.decoded', req.decoded.user_id);
            customModelsModules.User.findById(req.decoded.user_id)
              .populate({ path: "contactThread" })
              .exec((err, foundUser) => {
                console.log("founduser", foundUser);
                if (err) {
                  res.json({
                    success: false,
                    message: "Error occured " + err
                  });
                } else {
                  if (!foundUser) {
                    res.json({
                      success: false,
                      message: "Current user not found"
                    });
                  } else {
                    console.log("foundUser.contactThread.contacts", foundUser.contactThread.contacts);
                    console.log("newUser._id", newUser._id.toString());
                    console.log("foundUser.contactThread.contacts.includes(newUser._id)", foundUser.contactThread.contacts.includes(newUser._id));
                    if (foundUser.contactThread.contacts && foundUser.contactThread.contacts.includes(newUser._id)) {
                      res.json({
                        success: false,
                        message: "The user exists in your contacts"
                      });
                    } else {
                      customModelsModules.ContactThread.findOneAndUpdate({ threadOwner: req.decoded.user_id }, { $addToSet: { contacts: newUser._id } }, { sort: "contacts", new: true })
                        .populate({
                          path: "contacts",
                          select:
                            "-password -contactThread"
                        })
                        .exec(function(err, data) {
                          if (err) {
                            res.json({
                              success: false,
                              message:
                                "Something wrong with contact thread"
                            });
                          }
                          res.json({
                            success: true,
                            message: "Success",
                            user: newUser
                          });
                        });
                    }

                  }
                }
              });
          }
        }
      }
    });
});

router.get("/getAllContacts", Verify, function(req, res) {
  customModelsModules.User.findOne({ _id: req.decoded.user_id })
    .populate({
      path: "contactThread",
      populate: {
        path: "contacts",
        select: "username avatar messageThread",
        populate: {
          path: "messageThread",
          match: { chatBetween: req.decoded.user_id },
          populate: [
            {
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
      if (err) {
        res.json({ success: false, message: "Error occured " + err });
      } else {
        if (!data) {
          res.json({
            success: false,
            message: "User is undefined",
            contactThread: data.contactThread.contacts
          });
        } else {
          res.json({
            success: true,
            message: "All contacts initialized",
            contactThread: data.contactThread.contacts
          });
        }
      }
    });
});

module.exports = router;
