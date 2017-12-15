const config = require('../config');
const mongoose = require('mongoose');

const Verify = require('./authentication');

const User = require('../models/user');
const Message = require('../models/message');
const MessageThread = require('../models/messageThread');
const ContactThread = require('../models/contactThread');

module.exports = Connection = (socket, io) => {
      socket.on('sendMessage', function(data){
        if(!data.reciever){
          // console.log("Hi buddy")
          socket.emit("exception", {message: "Please choose a user to send message"})
        } else {
          var result = Verify(data.token, config.secret)
            if(result.type == "exception"){
              socket.emit('exception', result.data)
            } else {
                let senderId = result.data.user_id
                let recieverId = data.reciever._id
                let messageSend = data.message
                // console.log("senderId", senderId)
                // console.log("recieverId", recieverId)
                // console.log("messageSend", messageSend)
                var message = new Message({
                  _id: new mongoose.Types.ObjectId(),
                  sender: senderId,
                  reciever: recieverId,
                  text: messageSend
                })
                message.save(function(err, newMessage){
                  if (err) throw err
                })
                MessageThread.findOneAndUpdate({chatBetween: {$all: [senderId, recieverId]}}, {$addToSet: {messages: message._id}, $set:{lastMessage: message.text}}, {new:true})
                .populate({path: "messages", populate: {path: "reciever sender", select:"username"}})
                .exec(function(err, foundMessageThread){
                  if(err){
                    socket.emit('exception', {message: "error occured", err: err})
                  } else {
                    if(!foundMessageThread){
                      // console.log("foundMessageThread")
                      let messageThread = new MessageThread({
                        _id: new mongoose.Types.ObjectId(),
                        chatBetween: [mongoose.Types.ObjectId(senderId), mongoose.Types.ObjectId(recieverId)],
                        messages: [message._id],
                      })
                      messageThread.save(function(err, newMessageThread){
                        MessageThread.findByIdAndUpdate(newMessageThread._id, {lastMessage: message.text}, {new: true})
                        .populate({path: "messages", populate: {path: "reciever sender", select:"username"}})
                        .exec(function(err, updatedMessageThread){
                          if(err){
                            socket.emit('exception', {message: "error occured", err: err})
                          } else {
                            // console.log("User find senderId", senderId)
                            // console.log("User find recieverId", recieverId)
                            User.update({_id: {$in: [senderId, recieverId]}}, {$addToSet: {messageThread: updatedMessageThread._id}}, {select: "username messageThread", multi: true})
                            // .populate({path: "_id"})
                            .exec(function(err,updatedUser){
                              // console.log("updatedUser", updatedUser)
                              io.emit('success', {message: "Message thread was created and message was sent", messageSent: message})
                            })
                          }
                        })
                      })
                    } else {
                      // console.log("foundMessageThread2")
                      io.emit('success', {message: "Message was sent", messageSent: message})
                    }
                  }
                })
            }
          }
      })
      console.log('client connect to socket')
  }
