
 const socketIo = (http) => {
   const io = require('socket.io')(http, {cors : '*'});

   io.on('connection', function(socket) {
      socket.on('notifyTweetApproved', function (id) {
         io.emit('notifyTweetApproved', id);
      });
    });
 }

module.exports = socketIo;