
 const socketIo = (http) => {
   const io = require('socket.io')(http, {cors : '*'});

   io.on('connection', function(socket) {
      socket.on('notifyTweetApproved', function (id) {
         console.log('[SOCKET] notifyTweetApproved')
         io.emit('notifyTweetApproved', id);
      });
    });
 }

module.exports = socketIo;