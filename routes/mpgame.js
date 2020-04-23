const express = require("express");
const router = express.Router();
const hostgame = require('../gamefunctions/hostgame')
const joingame = require('../gamefunctions/joingame')
var http = require('http')
var io = require('socket.io')(http);
var bodyParser = require('body-parser');

router.get("/gamebegins", (req, res) => {
    res.render('dashboard/coj', {layout: false});
})

var roomno=0;
io.sockets.on('connection',function(socket){
    console.log('a new client connected')
    
    if(io.nsps['/'].adapter.rooms[roomno] && io.nsps['/'].adapter.rooms[roomno].length > 1)
    {roomno++;} 
    socket.join(roomno);
    io.sockets.in(roomno).emit('connectToRoom', roomno);
    
    socket.on('sendmsg',function(data){
         
        io.sockets.in('0').emit('updateHeader',data)
        
    })
})



module.exports = router;