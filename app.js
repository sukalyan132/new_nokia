// Load requirements
var http = require('http'),
io = require('socket.io');

// Create server & socket
var server = http.createServer();
server.listen(9090);
io = io.listen(server);


// Add a connect listener
io.sockets.on('connection', function(socket)
{
  console.log('Client connected.');

  // Disconnect listener
  /*socket.on('disconnect', function() {
  console.log('Client disconnected.');
  });*/
  
 socket.on('server custom event', function (data) {
                                                console.log(data);
                                               socket.emit('OnActivateRadarCbrs', {"freq": {"sas": 40,"cbrs1": 3650,"cbrs2": 3670,"fdd1": 2125,"fdd2": 2145}});

});
socket.on('server custom event2', function (data) {
                                                console.log(data);
                                              // socket.emit('OnActivateRadarCbrs', {"freq": {"sas": 40,"cbrs1": 3650,"cbrs2": 3670,"fdd1": 2125,"fdd2": 2145}});

});
});