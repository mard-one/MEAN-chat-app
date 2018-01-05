const router = require("express").Router();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const config = require("../config");
// const multer = require("multer");

const User = require("../models/user");

const Verify = require("./middleware/authentication");

// var Storage = multer.diskStorage({
//   destination: function(req, file, callback) {
//     callback(null, "../../assets/images");
//   },
//   filename: function(req, file, callback) {
//     callback(null, file.fieldname + "-" + Date.now() + "-" + file.originalname);
//   }
// });
// var upload = multer({ storage: Storage }).single("avatar");

router.get("/currentUser", Verify, (req, res) => {
  // console.log("req", req.body);
  User.findById(req.decoded.user_id, "-password")
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

router.post("/changeAvatar", (req, res) => {
  console.log('submit motherfucker');
  // console.log("files", req.files)
  // console.log("body", req.body)
  // upload(req, res, function(err) {
  //   if (err) {
  //     console.log("err", err);
  //     return res.end("Something went wrong!" + err);
  //   }
  //   return res.end("File uploaded sucessfully!.");
  // }); 
});

module.exports = router;
