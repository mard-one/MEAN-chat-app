const authentication = require("./authentication");
const contactThread = require("./contactThread");
const group = require("./group");
// const message = require("./message")
const messageThread = require("./messageThread");
const user = require("./user");

module.exports = {
  authentication: authentication,
  contactThread: contactThread,
  group: group,
  messageThread: messageThread,
  user: user
};
