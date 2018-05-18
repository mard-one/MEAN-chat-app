const express = require("express");
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const jwt = require("jsonwebtoken");

const config = require("./server/config");

const customModelsModules = require("./server/models")
const customRoutesModules = require("./server/routes");
const customSocketModules = require("./server/controllers/socket.io");
const Verify = require('./server/controllers/authentication')

const port = process.env.PORT || "8080";

const app = express();

mongoose.connect(config.database, err => {
  if (err) {
    console.log("Could NOT connect to database: ", err);
  } else {
    console.log("Connected to database: " + config.database);
  }
});

app.use(cors({ origin: "http://localhost:4200" }));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: false, limit: '50mb' }));
app.use(express.static(__dirname + "/client/dist"));
app.use("/user", customRoutesModules.user);
app.use("/authentication", customRoutesModules.authentication);
app.use("/contact", customRoutesModules.contactThread);
app.use("/thread", customRoutesModules.messageThread);
app.use("/group", customRoutesModules.group);

app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "client/dist/index.html"));
});

const server = app.listen(port, function() {
  console.log("Listening on port " + port);
});

// ---------------------- Socket.io ------------------------------
var io = require("socket.io").listen(server);
const usersOnline = [];

io.on("connection", socket => {
  var user = Verify(socket.handshake.query.token, config.secret);
  if(user.type == "success"){
    // Connection(socket, io, user);
    usersOnline.push(user.data.user_id);
    socket.on("give me online users", () => {
      var unique = usersOnline.filter((el, i, a) => i === a.indexOf(el));
      io.emit("online users", unique);
    });
  }
  socket.on("disconnect", () => {
    console.log("client disconnected", user.data);
    var index = usersOnline.indexOf(user.data.user_id);
    var disconnectUser = usersOnline.splice(index, 1);
    io.emit("online users", usersOnline);
  });
  customSocketModules.room(socket, io, user);
  customSocketModules.sendMessage(socket, io, user);
  customSocketModules.newGroup(socket, io, user);
});
