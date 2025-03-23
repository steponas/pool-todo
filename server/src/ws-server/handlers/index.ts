import {Server, Socket} from 'socket.io';
import {WSClientRequestTypes} from '../../../../types';
import {createUser} from './create-user';
import {tokenAuth} from './token-auth';

const nonAuthHandlers = [
  {type: WSClientRequestTypes.CREATE_USER, handler: createUser},
  {type: WSClientRequestTypes.TOKEN_AUTH, handler: tokenAuth},
];

export const setupHandlers = (io: Server, client: Socket) => {
  // Non-authenticated handlers
  nonAuthHandlers.forEach(handler => {
    client.on(handler.type, (data, callback) => handler.handler(io, client, data, callback));
  })
};
