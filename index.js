const express = require("express");
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const jwt = require("jsonwebtoken");

const authentication = require("./server/routes/authentication");
const contact = require("./server/routes/contactThread");
const thread = require("./server/routes/messageThread");
const user = require("./server/routes/user");

const config = require("./server/config");

const User = require("./server/models/user");
const Message = require("./server/models/message");
const MessageThread = require("./server/models/messageThread");
const ContactThread = require("./server/models/contactThread");

const Connection = require("./server/controllers/socketIo");
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
app.use("/user", user);
app.use("/authentication", authentication);
app.use("/contact", contact);
app.use("/thread", thread);

app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "client/dist/index.html"));
});

const server = app.listen(port, function() {
  console.log("Listening on port " + port);
});

// ---------------------- Socket.io ------------------------------
var io = require("socket.io").listen(server);

io.on("connection", socket => {
  socket.on("room", function(token) {
    var user = Verify(token, config.secret);
    console.log("user_id", user.data.user_id);
    if(user.type == "success"){
      // console.log("user.data.user_id", user.data.user_id);
      socket.join(user.data.user_id);
      // console.log("socket rooms", socket.adapter.rooms[user.data.user_id]);
    }
    // console.log('id', socket.id);
    // console.log("room", room);
    // console.log("Room",socket.adapter.rooms[room]);
    // console.log("socket rooms", socket.rooms);
  });
  console.info(`Client connected [id=${socket.id}]`);
  socket.on("disconnect", () => {
    console.info(`Client gone [id=${socket.id}]`);
  });
  Connection(socket, io)
});
