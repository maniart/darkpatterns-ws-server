var io = require('socket.io');
var http = require('http');

var server = http.createServer(function(req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.end('<h1 style="width: 100%; text-align: center;">Nothing to see here.</h1>');
});

server.listen(2323, function() {
  console.log('\n DARK PATTERNS WS SERVER LISTENING ON 2323\n');
});
io = io.listen(server);

// Add a connect listener
io.sockets.on('connection', function(socket){
  console.log('Client connected.');

  socket.on('move', function(data) {
    console.log('move', data);
    socket.broadcast.emit('move', data);
  });

  socket.on('up', function(data) {
    console.log('up', data);
    socket.broadcast.emit('up', data);
  });

  socket.on('down', function(data) {
    socket.broadcast.emit('down', data);
    console.log('down', data);
  });


  // Disconnect listener
  socket.on('disconnect', function() {
    console.log('Client disconnected.');
  });
});
