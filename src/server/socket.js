import socket from 'socket.io';

module.exports = function (server) {

var activeUsers = [];
const io = socket(server);

console.log('\nSETTING UP SOCKET\n');

io.sockets.on('connection', function (socket) {
    console.log(socket.id);
  socket.on('userConnecting', function (userId) {
      console.log('User ' + userId +  ' has just connected');
      activeUsers[socket.id] = userId;
  });

  socket.on('disconnect', function () {
      console.log(socket.id);
      var userId = activeUsers[socket.id];
      console.log('User ' + userId + ' is not Active');
      delete activeUsers[socket.id];
  })

  socket.on('message', function (data) {
      console.log('message');
  });

  socket.on('areTheyOnline', function () {
      socket.emit('usersOnline', activeUsers);
  });

});

}
