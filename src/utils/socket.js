import { Server } from 'socket.io';

let io;

export const createSocket = (server) => {
  try {
    io = new Server(server);
    io.on('connection', (socket) => {
      socket.join(socket.handshake.query.id);
    });
  } catch {
    console.error('Socket.io error.');
  }
};

export const emitData = ({ id, ...data }) => io?.to(id)?.emit('data', data);
