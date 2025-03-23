import {Server, Socket} from 'socket.io';
import {WSClientRequestTypes} from '../../../../types';
import {createUser} from './create-user';
import {tokenAuth} from './token-auth';
import {createList} from './create-list';
import {selectTodoListForUser} from './select-list';
import {getTodoList} from './get-todo-list';
import {createTodo} from './create-todo';
import {updateTodo} from './update-todo';

const nonAuthHandlers = [
  {type: WSClientRequestTypes.CREATE_USER, handler: createUser},
  {type: WSClientRequestTypes.TOKEN_AUTH, handler: tokenAuth},
];

const authenticatedHandlers = [
  {type: WSClientRequestTypes.CREATE_LIST, handler: createList},
  {type: WSClientRequestTypes.SELECT_LIST, handler: selectTodoListForUser},
  {type: WSClientRequestTypes.GET_LIST_TODOS, handler: getTodoList},
  {type: WSClientRequestTypes.CREATE_TODO, handler: createTodo},
  {type: WSClientRequestTypes.UPDATE_TODO, handler: updateTodo},
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
