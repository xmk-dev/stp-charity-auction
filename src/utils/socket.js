import { Server } from 'socket.io';

let socket;

export const connectSocket = (server) => {
  socket = new Server(server);
};

export const emitData = (data) => {
  socket?.emit('chat message', data);
};
