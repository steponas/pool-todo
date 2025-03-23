import {Server, Socket} from 'socket.io';
import {z} from 'zod';
import {
  WSAuthenticateRequest,
  WSAuthenticateResponse,
  WSErrorResponse
} from '../../../../types';
import {TodoListModel, UserModel} from '../../model';
import {logger} from '../../log';
import {updateSocketTodoList} from '../helpers';

const reqSchema = z.object({
  token: z.string().min(1),
  listCode: z.string().min(3).optional(),
});

const authUser = async (token: string, client: Socket) => {
  const user = await UserModel.findByToken(token);
  if (!user) {
    throw new Error(`failed to find user for token "${token}"`);
  }
  logger.info(`User ${user.name} authenticated`);
  client.data.user = user;
  return user;
}

const setListOnClient = async (client: Socket, listCode: string) => {
  const id = await TodoListModel.getIdByCode(listCode);
  if (!id) {
    logger.warn(`Failed to set list on client "${listCode}"`);
    return;
  }
  updateSocketTodoList(client, {id, code: listCode});
  logger.info(`List "${listCode}" assigned to user ${client.data.user.name}`);
}

export const tokenAuth = async (io: Server, client: Socket, data: WSAuthenticateRequest, callback: (r: WSAuthenticateResponse | WSErrorResponse) => unknown) => {
  if (client.data.user) {
    logger.info(`User ${client.data.user.name} already authenticated`);
    return callback({user: client.data.user});
  }
  try {
    const {token, listCode} = reqSchema.parse(data);
    const user = await authUser(token, client);
    if (data.listCode) {
      await setListOnClient(client, listCode);
    }
    callback({user});
  } catch (err) {
    logger.error('User by token not found', err);
    callback({error: 'Invalid token'});
  }
};
