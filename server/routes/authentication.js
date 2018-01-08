const router = require("express").Router();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const config = require("../config");

const customModelsModules = require("../models");


router.post("/register", function(req, res) {
  var user = new customModelsModules.User({
    _id: new mongoose.Types.ObjectId(),
    username: req.body.username,
    password: req.body.password
  });

  user.save(function(err, newUser) {
    if (err) throw err;
    var contactThread = new customModelsModules.ContactThread({
      _id: new mongoose.Types.ObjectId(),
      threadOwner: mongoose.Types.ObjectId(user._id),
      threadOwnerName: user.username
    });

    contactThread.save(function(err, newContactThread) {
      if (err) throw err;
      customModelsModules.User.findOneAndUpdate({ username: newUser.username }, { contactThread: newContactThread._id }).exec(
        () => {
          res.json({
            success: true,
            message: "User registered"
          });
        }
      );
    });
  });
});

router.post("/login", function(req, res) {
  if (!req.body.username) {
    res.json({ success: false, message: "username not provided" });
  } else {
    if (!req.body.password) {
      res.json({ success: false, message: "password not provided" });
    } else {
      customModelsModules.User.findOne(
        { username: req.body.username.toLowerCase() },
        (err, user) => {
          if (err) {
            res.json({ success: false, message: err });
          } else {
            if (!user) {
              res.json({ success: false, message: "Username not found" });
            } else {
              const validPassword = user.comparePassword(
                req.body.password
              );
              if (!validPassword) {
                res.json({ success: false, message: "Password invalid" });
              } else {
                const token = jwt.sign(
                  { user_id: user._id },
                  config.secret,
                  {
                    expiresIn: "1d"
                  }
                );
                res.json({
                  success: true,
                  message: "Success!",
                  token: token,
                  user: { username: user.username }
                });
              }
            }
          }
        }
      );
    }
  }
});

module.exports = router;
