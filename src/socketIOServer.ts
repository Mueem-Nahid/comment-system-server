import { Server } from 'http';
import { Server as SocketIOServer, Socket } from 'socket.io';
import config from './config';

let io: SocketIOServer;

export const configureSocketIO = (server: Server) => {
  io = new SocketIOServer(server, {
    cors: {
      origin: config.frontend_url, // Replace with your frontend URL
      methods: ['GET', 'POST'],
      credentials: true,
    },
  });

  io.on('connection', (socket: Socket) => {
    console.log(`Socket connected: ${socket.id}`);

    socket.on('disconnect', () => {
      console.log(`Socket disconnected: ${socket.id}`);
    });

    // Add your custom socket event handlers here
    // Example:
    // socket.on('chatMessage', (message: string) => {
    //    console.log(`Received message: ${message}`);
    //    // Broadcast the message to all connected clients
    //    io.emit('chatMessage', message);
    // });
  });

  return io;
};

export const getSocketIOInstance = (): SocketIOServer => {
  return io;
};
