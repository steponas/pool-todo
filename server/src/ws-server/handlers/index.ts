import {Server, Socket} from 'socket.io';
import {WSClientRequestTypes} from '../../../../types';
import {createUser} from './create-user';

export const setupHandlers = (io: Server, client: Socket) => {
  client.on(WSClientRequestTypes.CREATE_USER, (data, callback) => createUser(io, client, data, callback));
}
