const router = require("express").Router();
const mongoose = require("mongoose");
const multer = require("multer");

const customModelsModules = require("../models");

const Verify = require("./middleware/authentication");
const uploadToS3 = require('../controllers/fileUpload');

var Storage = multer.diskStorage({
  destination: function(req, file, callback) {
    callback(null, "./server/assets/images");
  },
  filename: function(req, file, callback) {
    callback(null, file.fieldname + "-" + Date.now() + "-" + file.originalname);
  }
});
var upload = multer({ storage: Storage });

router.post("/newGroup", Verify, upload.single("groupAvatar"), function(
  req,
  res
) {
  if (req.file) {
    var membersId = JSON.parse(req.body.members).map(member => member._id);
    membersId.push(req.decoded.user_id);
    let group = new customModelsModules.Group({
      _id: new mongoose.Types.ObjectId(),
      name: req.body.name,
      avatar: encodeURIComponent(req.file.filename),
      members: membersId,
      admins: req.decoded.user_id,
      creator: req.decoded.user_id,
      description: req.body.description
    });
    group.save(function(err, newGroup) {
      customModelsModules.User.update(
        { _id: { $in: newGroup.members } },
        { $addToSet: { groups: newGroup._id } },
        { multi: true }
      ).exec((err, addedGroupUser) => {
        customModelsModules.Group.findById(newGroup._id)
        .populate({path: "members", select: "-password -contactThread"})
        uploadToS3(req.file, function (data) {
          data.group = newGroup
          res.json(data);
        });
      });
    });
  } else {
    var membersId = req.body.members.map(member => member._id);
    membersId.push(req.decoded.user_id);
    let group = new customModelsModules.Group({
      _id: new mongoose.Types.ObjectId(),
      name: req.body.name,
      members: membersId,
      admins: req.decoded.user_id,
      creator: req.decoded.user_id,
      description: req.body.description
    });
    group.save(function(err, newGroup) {
      customModelsModules.User.update(
        { _id: { $in: newGroup.members } },
        { $addToSet: { groups: newGroup._id } },
        { multi: true }
      ).exec((err, addedGroupUser) => {
        res.json({
          success: true,
          message: "Group was created and added to Users",
          group: newGroup
        });
      });
    });
  }
});
router.post("/editGroup", Verify, upload.single("editGroupForm"), function(req,res) {
  if (req.file) {
    var membersId = JSON.parse(req.body.members).map(member=>member._id)
    var groupId = JSON.parse(req.body.currentGroupId);
    // console.log("membersId", membersId);
    customModelsModules.Group.findByIdAndUpdate(groupId, { $addToSet: { members: {$each: membersId} }, $set: { avatar: encodeURIComponent(req.file.filename) } }).exec(
      (err, editedGroup) => {
        // console.log("editedGroup", editedGroup);
        customModelsModules.User.update({ _id: membersId }, { $addToSet: { groups: editedGroup._id } }, { multi: true }).exec((err, user)=>{
          uploadToS3(req.file, function(data){
            data.group = editedGroup
            res.json(data)
          })
        })
      }
    );
  } else {
    // console.log("membersId", membersId);
    var membersId = req.body.members.map(member => member._id);
    customModelsModules.Group.findByIdAndUpdate(req.body.currentGroupId, { $addToSet: { members: {$each: membersId} } }).exec(
      (err, editedGroup) => {
        // console.log("editedGroup", editedGroup);
        customModelsModules.User.update({ _id: membersId }, { $addToSet: { groups: editedGroup._id } }, { multi: true }).exec(
          (err, user) => {
            res.json({
              success: true,
              message: "Group edited",
              group: editedGroup
            });
          }
        );
      }
    );
  }
});

module.exports = router;
