const router = require('express').Router();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const config = require('../config');


const User = require('../models/user');
const Message = require('../models/message');
const MessageThread = require('../models/messageThread');
const ContactThread = require('../models/contactThread');

const Verify = require('./middleware/authentication');

router.post('/addContact', Verify, function(req, res){
  console.log("req.body.username",  req.body.username)
   // res.json({success: false, body: req.body})
  User.findOne({username: req.body.username}, function(err, newUser){
    if(err){
      res.json({success: false, message: "Error occured" + err})
    } else {
      if(!newUser){
        res.json({success: false, message: "User not found"})
      } else {
        if( newUser._id == req.decoded.user_id){
          res.json({success: false, message: "You cannot add yourself"})
        }else{
          ContactThread.findOneAndUpdate({threadOwner: req.decoded.user_id}, {$addToSet:{'usersInContactThread':newUser._id}}, {sort: 'usersInContactThread', new: true})
          .exec(function(err, data){
            if (err) return handleError(err);
            res.json({success: true, message: "User was added"});
          })
        }
      }
    }
  })
})

// router.get("/getAllContacts", function(req, res){
//
//   User.findOne({_id: req.decoded.userId})
//   .populate({ path:"contactThread", populate: {path:"usersInContactThread", select: "username avatar"} })
//   .exec(function(err, data){
//     if(err) throw err
//     res.json({success: true, users: data.contactThread.usersInContactThread});
//   })
// })

module.exports = router
