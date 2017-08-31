import socket from 'socket.io';

module.exports = function (server) {

const io = socket(server);

console.log('\nSETTING UP SOCKET\n');


io.on('connection', function(socket) {
  console.log('a user connected')
})

}
