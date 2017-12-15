const express = require('express');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const authentication = require('./server/routes/authentication');
const contact = require('./server/routes/contact');
const thread = require('./server/routes/thread');
const message = require('./server/routes/message');
const api = require('./server/routes/api');

const config = require('./server/config');

const User = require('./server/models/user');
const Message = require('./server/models/message');
const MessageThread = require('./server/models/messageThread');
const ContactThread = require('./server/models/contactThread');

const Connected = require('./server/controllers/socketIo');

const port = process.env.PORT || '8080';

const app = express();

mongoose.connect(config.database, (err) => {
  if(err){
    console.log("Could NOT connect to database: ", err);
  } else {
    console.log("Connected to database: " + config.database);
  }
});

app.use(cors({origin: 'http://localhost:4200'}))
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/client/dist'));
app.use('/api', api);
app.use('/authentication', authentication);
app.use('/contact', contact);
app.use('/thread', thread);
// app.use('/message', message);



app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, 'client/dist/index.html'));
});

const server = app.listen(port, function() {
  console.log("Listening on port " + port);
})
var io = require('socket.io').listen(server)
io.on('connection', (socket)=>{
  Connection(socket, io)
});
