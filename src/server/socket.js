var _ = require('lodash');
import socket from 'socket.io';
import hash from 'object-hash';
import Database from './database';

var activeUsers = {};
var rooms = {};
var conversations = {};
var notifications = {};
var lastConnections = {};

module.exports = function (server) {

const io = socket(server);

console.log('\nSETTING UP SOCKET\n');

function getRoomIdFromUsers(users) {
    if (users && users[0] && users[1]) {
        console.log('gettig room for ');
        console.log(users);
        var possibleRoomId1 = hash([users[0], users[1]]);
        var possibleRoomId2 = hash([users[1], users[0]]);
        if (rooms.hasOwnProperty(possibleRoomId1)) {
            return possibleRoomId1;
        }
        else if (rooms.hasOwnProperty(possibleRoomId2)) {
            return possibleRoomId2;
        }
        else {
            return false;
        }
    }
    else {
        console.log('missing something to get room \n');
    }
}

function addMessageToConversation(roomId, chatMessage) {
    if (conversations.hasOwnProperty(roomId)) {
        console.log('adding message to existing conversation');
        var tempConversation = conversations[roomId];
        tempConversation.push(chatMessage);
        conversations[roomId] = tempConversation;
    }
    else {
        console.log('creating a new conversation and adding message');
        var newConversation = [];
        newConversation.push(chatMessage);
        conversations[roomId] = newConversation;
    }
}

function saveNotification(userId1, userId2, action) {
    var notification = {
        action: action,
        userId: userId1
    };
    if (notifications.hasOwnProperty(userId2)) {
        notifications[userId2].push(notification)
    }
    else {
        notifications[userId2] = [notification];
    }
    return notifications[userId2];
}

function isBlocked(users, userIdThatLiked) {

    var user = users[0];
    if ( user && user.block && user.block.includes(userIdThatLiked)) {
        return true;
    }
    return false;
}

io.sockets.on('connection', function (socket) {
  socket.on('userConnecting', function (userId) {
      console.log('User ' + userId +  ' has just connected\n');
      activeUsers[socket.id] = userId;
      lastConnections[userId] = Date.now();
      socket.emit('usersOnline', _.values(activeUsers));
      socket.broadcast.emit('userconnection', userId);
  });

  socket.on('logout', function () {
      var userId = activeUsers[socket.id];
      console.log('User ' + userId + ' is not Active\n');
      socket.broadcast.emit('userdisconnection', userId);
      delete activeUsers[socket.id];
  })

  socket.on('disconnect', function () {
      var userId = activeUsers[socket.id];
      console.log('User ' + userId + ' is not Active\n');
      socket.broadcast.emit('userdisconnection', userId);
      delete activeUsers[socket.id];
  })

  socket.on('getLastConnection', function (userId) {
      if (lastConnections.hasOwnProperty(userId)) {
          console.log("GONNA EMIT LAST CONNECTION 1" + lastConnections[userId]);
          socket.emit('lastConnection', lastConnections[userId]);
      }
      else {
          console.log("GONNA EMIT LAST CONNECTION 2");

          socket.emit('lastConnection', false);
      }
  });

  socket.on('message', function (data) {
      console.log(data);
  });

  socket.on('chatMessage', function (chatMessage) {
      var roomId = getRoomIdFromUsers([activeUsers[socket.id], chatMessage.chatUserId]);
      Database.getUsers([chatMessage.chatUserId])
      .then((users) => {
          return isBlocked(users, activeUsers[socket.id]);
      })
      .then((isBlocked) => {
          if (!isBlocked) {
              if (roomId) {
                  var socketId = _.findKey(activeUsers, function(o) { return o == chatMessage.chatUserId;})
                  var notif = saveNotification(activeUsers[socket.id], chatMessage.chatUserId, 'message');
                  socket.broadcast.to(socketId).emit('newNotifications', notif);
                  chatMessage.chatUserId = activeUsers[socket.id];
                  addMessageToConversation(roomId, chatMessage);
                  socket.broadcast.to(roomId).emit('chatMessage', chatMessage);
                  var conversationToSend = conversations[roomId] || [];
                  socket.emit('historyDemanded', conversationToSend);
                  console.log('transfering message\n');
              }
              else {
                  console.log('The users don\'t have a room, so they can no talk\n');
                  // MAYBE EMIT A ERROR TO TELL THE USER THAT SOMETHING WENT WRONG
                  // MAYBE NOT NECESSARY BECAUSE HE SHOULD NOT BE HERE
              }
          }
          else {
              console.log('message was blocked\n');
          }
      });
  });

  socket.on('matchCreation', function (matchCreation) {
      //needs to send a message to the person liked so i can add it in his myInfo
      //and also so can join the room that i will send him
        var userIdThatLiked = matchCreation.id1;
        var userIdThatWasLiked = matchCreation.id2;
        Database.getUsers([userIdThatWasLiked])
        .then((users) => {
            return isBlocked(users, userIdThatLiked);
        })
        .then((isBlocked) => {
            if (!isBlocked) {
                var users = [userIdThatLiked, userIdThatWasLiked];
                var newRoomId = hash(users);
                rooms[newRoomId] = users;
                var socketIdLikedUser = _.findKey(activeUsers, function(o) { return o == userIdThatWasLiked;})
                var info = {
                    userId: userIdThatLiked,
                    roomId: newRoomId
                };
                var notif = saveNotification(userIdThatLiked, userIdThatWasLiked, 'match');
                socket.broadcast.to(socketIdLikedUser).emit('newNotifications', notif);
                socket.broadcast.to(socketIdLikedUser).emit('joinThisRoomWithMe', info);
                console.log('user ' + userIdThatLiked + 'joinging this room' + newRoomId + '\n');
                socket.join(newRoomId);
                console.log('creationg a match');
                console.log('rooms so far = ', rooms);
            }
        });
  });

  socket.on('joinRoom', function (roomId) {
      if (rooms.hasOwnProperty(roomId)) {
          var userThatWillJoin = activeUsers[socket.id];
          console.log('User ' + userThatWillJoin + 'will join room ' + roomId + '\n');
          socket.join(roomId);
      }
      else {
          console.log('Someone tried to join a room that does not exists');
      }
  });

  socket.on('userLikeUser', function (likeUsers) {
      var userIdThatLiked = likeUsers.id1;
      var userIdThatWasLiked = likeUsers.id2;
      Database.getUsers([userIdThatWasLiked])
      .then((users) => {
          return isBlocked(users, userIdThatLiked);
      })
      .then((isBlocked) => {
          if (!isBlocked) {
              var socketIdLikedUser = _.findKey(activeUsers, function(o) { return o == userIdThatWasLiked;})
              if (Object.values(activeUsers).indexOf(userIdThatLiked) > -1) {
                  var notif = saveNotification(userIdThatLiked, userIdThatWasLiked, 'like');
                  socket.broadcast.to(socketIdLikedUser).emit('newNotifications', notif);
                  socket.broadcast.to(socketIdLikedUser).emit('youWereLikedBy', userIdThatLiked);
                  console.log('notifing this user' + userIdThatWasLiked + '\n');
              }
              else {
                  console.log('user was not communicated that he was liked because one of them is not online\n');
              }
          }
      })
  });

  socket.on('userDislikeUser', function (dislikeUsers) {
      var userIdThatDisliked = dislikeUsers.id1;
      var userIdThatWasDisliked = dislikeUsers.id2;
      Database.getUsers([userIdThatWasDisliked])
      .then((users) => {
          return isBlocked(users, userIdThatDisliked);
      })
      .then((isBlocked) => {
          if (!isBlocked) {
              var socketIdDislikedUser = _.findKey(activeUsers, function(o) { return o == userIdThatWasDisliked;})
              if (Object.values(activeUsers).indexOf(userIdThatDisliked) > -1) {
                  var notif = saveNotification(userIdThatDisliked, userIdThatWasDisliked, 'dislike');
                  socket.broadcast.to(socketIdDislikedUser).emit('newNotifications', notif);
                  socket.broadcast.to(socketIdDislikedUser).emit('youWereDislikedBy', userIdThatDisliked);
                  console.log('notifing this user' + userIdThatWasDisliked + '\n');
              }
              else {
                  console.log('user was not communicated that he was liked because one of them is not online\n');
              }
          }
      });
  });

  socket.on('matchDestruction', function (matchDestruction) {
      // id1 it's the one that liked, so he has to be connected to like. maybe it's not necessary to do this, DONT KNOW
      console.log('a match is going to be destroyed');
      var idsActiveUsers = _.values(activeUsers);
      if (idsActiveUsers.indexOf(matchDestruction.id1) != -1) {
          var roomId = getRoomIdFromUsers(matchDestruction);
          if (roomId) {
              console.log('destroying a match\n');
              delete rooms[roomId];
          }
          else {
              console.log('it was not destroyed, possibleRoomId nor possibleRoomId2 were found in rooms\n');
          }
      }
      else {
          console.log('match was not destroyed because the user is not connected ??? weird\n');
      }
      console.log('rooms so far = ', rooms + '\n');
  });

  socket.on('getHistory', function (users) {
      var roomId = getRoomIdFromUsers(users);

      var conversationToSend = conversations[roomId] || [];
      socket.emit('historyDemanded', conversationToSend);
  })

  socket.on('getNotifications', function (id) {
      socket.emit('newNotifications', notifications[id]);
  })

  socket.on('deletemyNotifications', function (id) {
      var connectedIds = _.values(activeUsers);
      if (connectedIds.includes(id)) {
          console.log('deleting his notifications');
          notifications[id] = [];
      }
      else {
          console.log('this user is not log in so he shouldn\'t be here');
      }
  });

  socket.on('amIBlockedBy', function (userId) {
      Database.getUsers([userId])
      .then((users) => {
          return isBlocked(users, activeUsers[socket.id]);
      })
      .then((isHeBlocked) => {
          var result = {
              isHeBlocked: isHeBlocked,
              userIdThatBlocked: userId
          }
          socket.emit('returnAmIBlockedBy', result);
      })
  });

  socket.on('iJustBlockedThisId', function (userId) {
      var socketId = _.findKey(activeUsers, function(o) { return o == userId})
      var result = {
          isHeBlocked : true,
          userIdThatBlocked: activeUsers[socket.id]
      }
      socket.broadcast.to(socketId).emit('returnAmIBlockedBy', result);
  });

  socket.on('iVisitedThisId', function (visitObj) {
       var socketId = _.findKey(activeUsers, function(o) { return o == visitObj.userId});
       var userIdThatVisited = activeUsers[socket.id];
       var visit = {
           id: userIdThatVisited,
           pseudo: visitObj.pseudo,
           time: visitObj.time
       };
       if (visitObj.picture) {
           visit.picture = visitObj.picture;
       }
       socket.broadcast.to(socketId).emit('youWereVisited', visit);
       Database.getUsers([visitObj.userId])
       .then((users) => {
           return isBlocked(users, activeUsers[socket.id]);
       })
       .then((isBlocked) => {
           if (!isBlocked) {
               var notif = saveNotification(activeUsers[socket.id], visitObj.userId, 'visit');
               socket.broadcast.to(socketId).emit('newNotifications', notif);
           }
       })
       .catch((err) => {
           console.log(err);
       })
  })

});

}
