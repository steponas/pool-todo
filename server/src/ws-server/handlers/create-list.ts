import {Server, Socket} from 'socket.io';
import {
  User,
  WSCreateListRequest,
  WSErrorResponse,
  WSListCreatedResponse
} from '../../../../types';
import {logger} from '../../log';
import {TodoListModel} from '../../model';

export const createList = async (io: Server, client: Socket, data: WSCreateListRequest, callback: (r: WSListCreatedResponse | WSErrorResponse) => unknown) => {
  const user: User = client.data.user;
  try {
    const list = await TodoListModel.create({
      createdBy: user.id,
    });
    callback({list});
    logger.info(`List "${list.code}" created by ${user.name}`);
  } catch (err) {
    logger.error('Failed to create a todo list', err);
    callback({error: 'Failed to create a list'});
  }
};
