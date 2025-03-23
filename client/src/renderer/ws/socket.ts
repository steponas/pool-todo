import {io} from 'socket.io-client';
import Log from 'electron-log/renderer';

let socket: ReturnType<typeof io>;

export const setupWSConnection = () => {
  socket = io('http://localhost:10000');

  socket.on('connect', () => {
    Log.info('Connected');
  })
};

export const getSocket = () => {
  if (!socket) {
    throw new Error('Socket not initialized');
  }
  return socket;
}
