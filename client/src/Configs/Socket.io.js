import io from 'socket.io-client';

const newSocket = io(process.env.REACT_APP_API_URL);

export default newSocket;