const http = require("http");
const fs = require("fs");

const server = http.createServer(function(req, res) {
    fs.readFile('./index.html', 'utf8', function(error, content) {
        res.writeHead(200, {"Content-Type": "text/html"});
        res.end(content)
    });
});

const io = require('socket.io').listen(server);

io.sockets.on('connection', function (socket){
    socket.on('pseudo', function(pseudo){
        socket.pseudo  = pseudo;
        socket.broadcast.emit('welcome', socket.pseudo + 'entre dans le chat');

    });

    socket.on('message', function(message){
        socket.broadcast.emit('new_message', socket.pseudo + ' '  + message);
        socket.emit('new_message', socket.pseudo + ' '  + message);

    });

});


server.on('close', function() { // On écoute l'évènement close
    console.log('Bye bye !');
});

server.listen(8080);


