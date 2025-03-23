import {Server, Socket} from 'socket.io';
import {TodoItemModel} from '../../model';
import {logger} from '../../log';
import {
  WSErrorResponse,
  WSGetListTodosResponse,
} from '../../../../types';

export const getTodoList = async (io: Server, client: Socket, data: void, callback: (r: WSGetListTodosResponse | WSErrorResponse) => unknown) => {
  if (!client.data.todoList) {
    logger.warn('Querying for TODOs without selecting a list');
    return callback({error: 'No list selected'});
  }
  try {
    const id = client.data.todoList.id;
    if (!id) {
      throw new Error('Todo list object does not contain id');
    }
    const x = await TodoItemModel.getAllForList(id)
    console.log({x});
    callback({
      todos: x,
    })
  } catch (err) {
    logger.error('Failed to fetch TODOs for list: ', err);
    callback({error: 'Failed to fetch TODOs for list'});
  }
};
