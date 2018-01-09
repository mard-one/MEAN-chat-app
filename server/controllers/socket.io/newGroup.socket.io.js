const config = require("../../config");
const mongoose = require("mongoose");

const Verify = require("./../authentication");
const customModelsModules = require("../../models");

module.exports = function newGroup(socket, io, currentUser) {
  socket.on("new group", function(data) {
    console.log("data", data);
    if(data.addedUser){
      console.log("data.addedUser", data.addedUser);
      data.addedUser.forEach(newUser=>{
        console.log("newUser", newUser);
        io.to(newUser._id).emit("new group success", { group: data.group });
      })
    }else{
      data.group.members.forEach(member => {
        io.to(member).emit("new group success", { group: data.group });
      });
    }
  });
};
