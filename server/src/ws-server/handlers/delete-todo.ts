import {Server, Socket} from 'socket.io';
import {
  WSDeleteTodoItemRequest,
  WSDeleteTodoItemResponse,
  WSErrorResponse,
} from '../../../../types';
import {TodoItemModel} from '../../model';
import {notifyListUpdate} from '../helpers';
import {logger} from '../../log';

export const deleteTodo = async (io: Server, client: Socket, data: WSDeleteTodoItemRequest, callback: (r: WSDeleteTodoItemResponse | WSErrorResponse) => unknown) => {
  try {
    const result = await TodoItemModel.delete(data, client.data.todoList.id);
    callback(result);
    notifyListUpdate(io, client);
    logger.info('TODO deleted');
  } catch (err) {
    logger.error('Failed to delete a todo item', err);
    callback({error: 'Failed to delete the todo'});
  }
};
