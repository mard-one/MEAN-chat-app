const mongoose = require("mongoose");

const Verify = require("./../authentication");
const customModelsModules = require("../../models");

module.exports = function room(socket, io, currentUser) {
  socket.on("room", function(token) {
    if (currentUser.type == "success") {
      // console.log("currentUser.data.user_id", currentUser.data.user_id);
      socket.join(currentUser.data.user_id);
      // console.log("rooms", io.sockets.adapter.rooms[currentUser.data.user_id]);
    }
  });
};
