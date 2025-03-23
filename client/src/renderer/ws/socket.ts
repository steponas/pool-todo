import {io} from 'socket.io-client';
import Log from 'electron-log/renderer';
import {SERVER_URL} from './config';

let socket: ReturnType<typeof io>;

export const setupWSConnection = () => {
  socket = io(SERVER_URL);

  socket.on('connect', () => {
    Log.info('Connected to WebSocket');
  })
  socket.on('disconnect', () => {
    Log.info('Disconnected from WebSocket');
  });
};

export const getSocket = () => {
  if (!socket) {
    throw new Error('Socket not initialized');
  }
  return socket;
}
