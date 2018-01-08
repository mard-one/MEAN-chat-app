const config = require("../../config");
const mongoose = require("mongoose");

const Verify = require("./../authentication");
const customModelsModules = require("../../models");

module.exports = function room(socket, io, currentUser) {
  socket.on("room", function(token) {
    if (currentUser.type == "success") {
      socket.join(currentUser.data.user_id);
    }
  });
};
