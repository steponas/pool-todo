import {Server, Socket} from 'socket.io';
import {
  User,
  WSErrorResponse,
  WSListCreatedResponse
} from '../../../../types';
import {logger} from '../../log';
import {TodoListModel} from '../../model';

export const createList = async (io: Server, client: Socket, data: void, callback: (r: WSListCreatedResponse | WSErrorResponse) => unknown) => {
  const user: User = client.data.user;
  try {
    const list = await TodoListModel.create({
      createdBy: user.id,
    });
    client.data.todoList = {
      id: list.id,
      code: list.code,
    }
    callback({list});
    logger.info(`List "${list.code}" created by ${user.name}`);
  } catch (err) {
    logger.error('Failed to create a todo list', err);
    callback({error: 'Failed to create a list'});
  }
};
