import {Server, Socket} from 'socket.io';
import {WSClientRequestTypes} from '../../../../types';
import {createUser} from './create-user';
import {tokenAuth} from './token-auth';
import {createList} from './create-list';
import {validateListExists} from './validate-list-exists';
import {getTodoList} from './get-todo-list';

const nonAuthHandlers = [
  {type: WSClientRequestTypes.CREATE_USER, handler: createUser},
  {type: WSClientRequestTypes.TOKEN_AUTH, handler: tokenAuth},
];

const authenticatedHandlers = [
  {type: WSClientRequestTypes.CREATE_LIST, handler: createList},
  {type: WSClientRequestTypes.VALIDATE_LIST_EXISTS, handler: validateListExists},
  {type: WSClientRequestTypes.GET_LIST_TODOS, handler: getTodoList},
];

export const setupHandlers = (io: Server, client: Socket) => {
  // Non-authenticated handlers
  nonAuthHandlers.forEach(handler => {
    client.on(handler.type, (data, callback) => handler.handler(io, client, data, callback));
  });

  // Handlers which require authentication
  authenticatedHandlers.forEach(handler => {
    client.on(handler.type, (data, callback) => {
      if (!client.data.user) {
        return callback({error: 'Not authenticated'});
      }

      handler.handler(io, client, data, callback);
    });
  })
};
