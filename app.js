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

var roomno=Math.floor(Math.random() * 100000);;

var roomnoarray=[];

function generateroom(){
    
        var newno = Math.floor(Math.random() * 100000);
        roomnoarray.push(newno)
   

}

io.sockets.on('connection',function(socket){
    
    console.log('a new client connected')
    if(io.nsps['/'].adapter.rooms[roomno] && io.nsps['/'].adapter.rooms[roomno].length > 1)
    {roomno=Math.floor(Math.random() * 100000);} 
    socket.join(roomno);
   io.sockets.in(roomno).emit('connectToRoom', roomno);
   console.log(io.nsps['/'].adapter.rooms)
    
    
    /* 
       // generateroom();
        console.log('1st room created *')
        console.log(io.nsps['/'].adapter.rooms)
    if  (io.nsps['/'].adapter.rooms.length==0){
        generateroom();
        var number =roomnoarray.length;
        socket.join(roomnoarray[number-1]);
        console.log('1st room created')
        console.log('socket joined room'+roomnoarray[number-1])
    }
    else if (io.nsps['/'].adapter.rooms[roomnoarray[roomnoarray.length-1]]&&io.nsps['/'].adapter.rooms[roomnoarray[roomnoarray.length-1]].length>=1)
    {
        generateroom();
        var number =roomnoarray.length;
        socket.join(roomnoarray[number-1]);
        console.log('socket joined room'+roomnoarray[number-1])
    }
    else
    {
        var number =roomnoarray.length;
        socket.join(roomnoarray[number-1]);
        console.log('socket joined room'+roomnoarray[number-1])
    } */
    
    socket.on('sendmsg',function(data){
       
        
        console.log(socket.rooms[Object.keys(socket.rooms)[0]])
        //console.log(io.sockets.manager.roomClients[socket.id])
        //io.sockets.in(socket.rooms).emit('updateHeader',data)
        //socket.broadcast.to(socket.rooms).emit('updateHeader',data)
        io.sockets.in(socket.rooms[Object.keys(socket.rooms)[0]]).emit('updateHeader',data)
        for (let index = 0; index < roomnoarray.length; index++) {
            
            io.sockets.in("'"+roomnoarray[index]+"'").emit('updateHeader',data)
        }
        
    })
})


