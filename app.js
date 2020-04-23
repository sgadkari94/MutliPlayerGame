var express= require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var bodyParser = require('body-parser');

var port=8000;

app.get('/',function(req,res){
    res.sendFile(__dirname+'/index.html')
    
});

http.listen(port,function(){
    console.log('listening on:'+port);
    
});

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

