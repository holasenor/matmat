var _ = require('lodash');
import socket from 'socket.io';
import hash from 'object-hash';

var activeUsers = {};
var rooms = {};

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

  socket.on('chatMessage', function (chatMessage) {
      console.log('user ' + activeUsers[socket.id] + ' send ' + chatMessage.message + ' to ' + chatMessage.chatUserId);
  });

  socket.on('matchCreation', function (matchCreation) {
      //needs to send a message to the person liked so i can add it in his myInfo
      //and also so can join the room that i will send him
        var userIdThatLiked = matchCreation.id1;
        var userIdThatWasLiked = matchCreation.id2;
        var users = [userIdThatLiked, userIdThatWasLiked];
        var newRoomId = hash(users);
        rooms[newRoomId] = users;
        var socketIdLikedUser = _.findKey(activeUsers, userIdThatWasLiked);
        var info = {
            userId: userIdThatLiked,
            roomId: newRoomId
        };
        socket.broadcast.to(socketIdLikedUser).emit('joinThisRoomWithMe', info);
        socket.join(newRoomId);
        console.log('creationg a match');
        console.log('rooms so far = ', rooms);
  });

  socket.on('matchDestruction', function (matchDestruction) {
      // id1 it's the one that liked, so he has to be connected to like. maybe it's not necessary to do this, DONT KNOW
      var idsActiveUsers = _.values(activeUsers);
      if (idsActiveUsers.indexOf(matchDestruction.id1) != -1) {
          var users = [matchDestruction.id1, matchDestruction.id2];
          var userReverse = [matchDestruction.id2, matchDestruction.id1];
          var possibleRoomId = hash(users);
          var possibleRoomId2 = hash(userReverse);
          console.log('destroying a match');
          if (rooms.hasOwnProperty(possibleRoomId)) {
              delete rooms[possibleRoomId];
          }
          else if (rooms.hasOwnProperty(possibleRoomId2)) {
              delete rooms[possibleRoomId2];
          }
          else {
              console.log('it was not destroyed, possibleRoomId nor possibleRoomId2 were found in rooms');
          }
      }
      else {
          console.log('match was not destroyed because the user is not connected ??? weird');
      }
      console.log('rooms so far = ', rooms);
  });

});

}
