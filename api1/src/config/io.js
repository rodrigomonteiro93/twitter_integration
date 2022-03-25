
 const socketIo = (http) => {
   const io = require('socket.io')(http, {cors : '*'});

   io.on('connection', function(socket) {
      socket.on('notificaTweet', function (msg) {
         io.emit('notificaTweet', msg);
      });
    });
 }

module.exports = socketIo;