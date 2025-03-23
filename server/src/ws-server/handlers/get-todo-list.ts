import {Server, Socket} from 'socket.io';
import {TodoListModel} from '../../model';
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
      throw new Error('List object does not contain id');
    }
    callback({
      todos: await TodoListModel.getAllForList(id),
    })
  } catch (err) {
    logger.error('Failed to fetch TODOs for list: ', err);
    callback({error: 'Failed to fetch TODOs for list'});
  }
};
