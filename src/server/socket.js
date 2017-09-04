var _ = require('lodash');
import socket from 'socket.io';

var activeUsers = {};

module.exports = function (server) {

const io = socket(server);

console.log('\nSETTING UP SOCKET\n');

io.sockets.on('connection', function (socket) {
  socket.on('userConnecting', function (userId) {
      console.log('User ' + userId +  ' has just connected');
      activeUsers[socket.id] = userId;
      console.log('active users so far = ');
      console.log(activeUsers);
      socket.emit('usersOnline', _.values(activeUsers));
      socket.broadcast.emit('userconnection', userId);
  });

  socket.on('disconnect', function () {
      var userId = activeUsers[socket.id];
      console.log('User ' + userId + ' is not Active');
      socket.broadcast.emit('userdisconnection', userId);
      delete activeUsers[socket.id];
  })

  socket.on('message', function (data) {
      console.log('message');
  });

});

}
