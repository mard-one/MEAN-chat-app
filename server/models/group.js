const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const User = require("./user");
const Message = require("./message");

var groupSchema = new Schema({
  name: String,
  avatar: { type: String, default: "defaultGroup.svg" },
  messages: [{ type: Schema.Types.ObjectId, ref: "Message" }],
  lastMessage: String,
  members: [{ type: Schema.Types.ObjectId, ref: "User" }],
  admins: [{ type: Schema.Types.ObjectId, ref: "User" }],
  creator: { type: Schema.Types.ObjectId, ref: "User" },
  createdAt: { type: Date, default: Date.now },
  description: String
});

module.exports = mongoose.model("Group", groupSchema);
