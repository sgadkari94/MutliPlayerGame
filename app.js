const path = require('path');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const exphbs  = require('express-handlebars');
//var quizvar = require('./Socketfiles/connect to room');
const configRoutes = require("./routes");
var http = require('http').Server(app);
var io = require('socket.io')(http);
//var bodyParser = require('body-parser');

 app.use(express.static(path.join(__dirname, '/public')));
 app.use(bodyParser.urlencoded({ extended: true }));

 app.engine('handlebars', exphbs({defaultLayout: 'main'}));
 app.set('view engine', 'handlebars');



configRoutes(app);

app.listen(3000, () => {
	console.log("We've now got a server!");
	console.log('Your routes will be running on http://localhost:3000');
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
