const router = require("express").Router();
const mongoose = require("mongoose");
const multer = require("multer");

const Verify = require("./middleware/authentication");
const customModelsModules = require("../models");

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
      avatar: req.file.filename,
      members: membersId,
      admins: req.decoded.user_id,
      creator: req.decoded.user_id,
      description: req.body.description
    });
    group.save(function(err, newGroup) {
      console.log("newGroup.members", newGroup.members);
      console.log("membersId", membersId);
      customModelsModules.User.update(
        { _id: { $in: newGroup.members } },
        { $addToSet: { groups: newGroup._id } },
        { multi: true }
      ).exec((err, addedGroupUser) => {
        console.log("Group added to user", addedGroupUser);
        res.json({
          success: true,
          message: "Group was created and added to Users",
          group: newGroup
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
      console.log("newGroup.members", newGroup.members);
      console.log("membersId", membersId);
      customModelsModules.User.update(
        { _id: { $in: newGroup.members } },
        { $addToSet: { groups: newGroup._id } },
        { multi: true }
      ).exec((err, addedGroupUser) => {
        console.log("Group added to user", addedGroupUser);
        res.json({
          success: true,
          message: "Group was created and added to Users",
          group: newGroup
        });
      });
    });
  }
});
router.post("/editGroup", Verify, upload.single("editGroupForm"), function(
  req,
  res
) {
  console.log("req.body", req.body);
  console.log("req.file", req.file);
  if (req.file) {
    var membersId = JSON.parse(req.body.members).map(member=>member._id)
    var groupId = JSON.parse(req.body.currentGroupId);
    console.log("membersId", membersId);
    customModelsModules.Group.findByIdAndUpdate(groupId, { $addToSet: { members: {$each: membersId} }, $set: { avatar: req.file.filename } }).exec(
      (err, editedGroup) => {
        console.log("editedGroup", editedGroup);
        customModelsModules.User.update({ _id: membersId }, { $addToSet: { groups: editedGroup._id } }, { multi: true }).exec((err, user)=>{
          res.json({
            success: true,
            message: "Group edited",
            group: editedGroup
          });
        })
      }
    );
  } else {
    console.log("membersId", membersId);
    var membersId = req.body.members.map(member => member._id);
    customModelsModules.Group.findByIdAndUpdate(req.body.currentGroupId, { $addToSet: { members: {$each: membersId} } }).exec(
      (err, editedGroup) => {
        console.log("editedGroup", editedGroup);
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
