export function emmitNotification(socket, notificationID, callback) {
  socket.emit(notificationID, callback);
}

export function onNotification(socket, notificationID, callback) {
  socket.on(notificationID, callback);
}

export function closeIo(socket, ) {
  socket.close()
}