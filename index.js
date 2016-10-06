var io = require('socket.io');
var http = require('http');
var server = http.createServer(function(req, res) {
  res.writeHead(404, {'Content-Type': 'text/html'});
  res.end('<h1>Aw, snap! 404</h1>');
});

server.listen(2323, function() {
  console.log('socket server listening on 2323');
});
io = io.listen(server);

// Add a connect listener
io.sockets.on('connection', function(socket){
  console.log('Client connected.');

  socket.on('move', function(data) {
    var id = data.id;
    var axis = data.axis;
    var value = data.value;
    var name = data.name;
    console.log('move', id, axis, value, name);
  });

  socket.on('up', function(data) {
    var id = data.id;
    var num = data.num;
    var name = data.name;
    console.log('up', id, num, name);
  });

  socket.on('down', function(data) {
    var id = data.id;
    var num = data.num;
    var name = data.name;
    console.log('down', id, num, name);
  });


  // Disconnect listener
  socket.on('disconnect', function() {
    console.log('Client disconnected.');
  });
});
