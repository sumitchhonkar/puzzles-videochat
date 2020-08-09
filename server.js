const express = require('express');

const app = express();

const server = require('http').Server(app);

const {v4: uuidv4} = require('uuid');

const io = require('socket.io')(server)

const { ExpressPeerServer } = require('peer');
const peerServer = ExpressPeerServer(server, {
  debug: true
});

app.set('view engine', 'ejs'); //ejs is used to transfer variables from backend(node.js) to our front end
app.use(express.static('public'));

app.use('/peerjs', peerServer);

app.get('/', (req,res) => {
   // res.status(200).send("Hello World!");
   //res.render('room');
   res.redirect(`/${uuidv4()}`);
});

app.get('/:room', (req,res) => {
    res.render('room', {roomId: req.params.room})
})

io.on('connection', socket => {
    socket.on('join-room', (roomId, userId) => {
       // console.log("joined room");
       socket.join(roomId);
       socket.to(roomId).broadcast.emit('user-connected', userId);
    })
})

server.listen(3030);