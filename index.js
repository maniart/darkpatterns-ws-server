var ws = require('ws');
var express = require('express');
var http = require('http');

var app = express();
var server = http.createServer(app).listen(2323, function() {
  console.log('____ dark patterns ws server listening on 2323');
});
var wsServer = new ws.Server({
  server: server
});

wsServer.on('connection', function(ws) {
  console.log('new connection');
  ws.on('message', function(message) {
    console.log('received message: ', message);
    wsServer.clients.forEach(function(client) {
      client.send('pong', function(err, something) {
        console.log('send: ', err, something);
      });
    });
  });


  ws.on('close', function() {
    console.log('closing ws server connection');
  });
});
