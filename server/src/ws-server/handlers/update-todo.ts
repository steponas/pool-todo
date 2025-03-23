import {Server, Socket} from 'socket.io';
import {
  WSErrorResponse,
  WSUpdateTodoItemRequest,
  WSUpdateTodoItemResponse,
} from '../../../../types';
import {logger} from '../../log';
import {TodoItemModel} from '../../model';

export const updateTodo = async (io: Server, client: Socket, data: WSUpdateTodoItemRequest, callback: (r: WSUpdateTodoItemResponse | WSErrorResponse) => unknown) => {
  try {
    const status = await TodoItemModel.update(data, client.data.todoList.id);
    callback(status);
    logger.info('TODO updated');
  } catch (err) {
    logger.error('Failed to update a todo item', err);
    callback({error: 'Failed to update the todo'});
  }
};
