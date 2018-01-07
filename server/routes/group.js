const router = require("express").Router();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const config = require("../config");
const multer = require("multer");

const User = require("../models/user");

const Verify = require("./middleware/authentication");


var Storage = multer.diskStorage({
  destination: function(req, file, callback) {
    callback(null, "./server/assets/images");
  },
  filename: function(req, file, callback) {
    callback(null, file.fieldname + "-" + Date.now() + "-" + file.originalname);
  }
});
var upload = multer({ storage: Storage }).single("groupAvatar");

router.post("/newGroup", upload, (req, res) => {
  console.log("req.body", req.body);
  console.log("req.file", req.file);
});


module.exports = router;
