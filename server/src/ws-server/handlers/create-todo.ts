import {Server, Socket} from 'socket.io';
import {
  WSCreateTodoItemRequest,
  WSCreateTodoItemResponse,
  WSErrorResponse,
} from '../../../../types';
import {logger} from '../../log';
import {TodoItemModel} from '../../model';
import {notifyListUpdate} from '../helpers';

export const createTodo = async (io: Server, client: Socket, data: WSCreateTodoItemRequest, callback: (r: WSCreateTodoItemResponse | WSErrorResponse) => unknown) => {
  try {
    const item = await TodoItemModel.create(data, {
      createdBy: client.data.user.id,
      listId: client.data.todoList.id,
    });
    callback({todo: item});
    notifyListUpdate(io, client);
    logger.info(`TODO created by ${client.data.user.name}`);
  } catch (err) {
    logger.error('Failed to create a todo item', err);
    callback({error: 'Failed to create the todo'});
  }
};
