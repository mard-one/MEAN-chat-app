const sendMessage = require("./sendMessage.socket.io")
const room = require("./room.socket.io")
const newGroup = require("./newGroup.socket.io")

module.exports = {
  room: room,
  sendMessage: sendMessage,
  newGroup: newGroup
};