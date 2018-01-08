const router = require("express").Router();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const config = require("../config");
const multer = require("multer");


const customModelsModules = require("../models");
const Verify = require("./middleware/authentication");

router.get("/currentUser", Verify, (req, res) => {
  // console.log("req", req.body);
  customModelsModules.User
    .findById(req.decoded.user_id, "-password")
    .populate([
      {
        path: "contactThread",
        populate: {
          path: "contacts",
          select: "-password -contactThread",
          populate: [
            {
              path: "messageThread",
              populate: {
                path: "messages"
              }
            },
            {
              path: "chatBetween",
              select: "-password -contactThread"
            }
          ]
        }
      },
      {
        path: "messageThread",
        populate: [
          { path: "messages" },
          { path: "chatBetween", select: "-password" }
        ]
      }
    ])
    .exec((err, user) => {
      res.json({
        success: true,
        message: "Hello " + user.username,
        userData: user
      });
    });
});

var Storage = multer.diskStorage({
  destination: function(req, file, callback) {
    callback(null, "./server/assets/images");
  },
  filename: function(req, file, callback) {
    callback(null, file.fieldname + "-" + Date.now() + "-" + file.originalname);
  }
});
var upload = multer({ storage: Storage }).single("profileAvatar");

router.post("/changeAvatar", Verify, (req, res) => {
  if(req.body && req.body.avatarName ){
    customModelsModules.User.findByIdAndUpdate(req.decoded.user_id, {
      $set: { avatar: req.body.avatarName }
    }).exec((err, updatedUser) => {
      res.json({ success: true, message: "File uploaded sucessfully!" });
    });
  } else {
    upload(req, res, function(err) {
      if (err) {
        res.json({
          success: false,
          message: "Something went wrong!" + err
        });
      } else {
        customModelsModules.User.findByIdAndUpdate(
          req.decoded.user_id,
          {
            $set: { avatar: req.file.filename }
          }
        ).exec((err, updatedUser) => {
          res.json({
            success: true,
            message: "File uploaded sucessfully!"
          });
        });
      }
    }); 
  }
});
router.post("/userExist", Verify, (req, res) => {
  customModelsModules.User.findById(req.decoded.user_id).exec(
    (err, currentUser) => {
      customModelsModules.User.findOne({ username: req.body.username }, "-password -contactThread").exec(
        (err, foundUser) => {
          if (err) {
            res.json({ success: false, message: "Error occured " + err });
          } else {
            if (!foundUser) {
              res.json({ success: false, message: "User not exists" });
            } else {
              console.log("currentUser._id", currentUser._id);
              console.log("foundUser._id", foundUser._id);
              if (
                currentUser._id.toString() == foundUser._id.toString()
              ) {
                console.log("add yourself");
                res.json({
                  success: false,
                  message:
                    "Don't need to add yourself. You will be automatically added"
                });
              } else {
                res.json({
                  success: true,
                  message: "User added",
                  user: foundUser
                });
              }
            }
          }
        }
      );
    }
  );  
});



module.exports = router;
