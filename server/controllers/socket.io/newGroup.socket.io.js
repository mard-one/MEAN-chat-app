const config = require("../../config");
const mongoose = require("mongoose");

const Verify = require("./../authentication");
const customModelsModules = require("../../models");

module.exports = function newGroup(socket, io, currentUser) {
  socket.on("new group", function(data) {
    data.group.members.forEach(member => {
      io.to(member).emit("new group success", {group: data.group});
    });
  });
};
