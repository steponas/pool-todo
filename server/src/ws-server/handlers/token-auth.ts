import {Server, Socket} from 'socket.io';
import {
  WSAuthenticateRequest,
  WSAuthenticateResponse,
  WSErrorResponse
} from '../../../../types';
import {UserModel} from '../../model';
import {logger} from '../../log';

export const tokenAuth = async (io: Server, client: Socket, data: WSAuthenticateRequest, callback: (r: WSAuthenticateResponse | WSErrorResponse) => unknown) => {
  if (client.data.user) {
    logger.info(`User ${client.data.user.name} already authenticated`);
    return callback({user: client.data.user});
  }
  try {
    const user = await UserModel.findByToken(data.token);
    if (!user) {
      throw new Error(`failed to find user for token "${data.token}"`);
    }
    logger.info(`User ${user.name} authenticated`);
    client.data.user = user;
    callback({user});
  } catch (err) {
    logger.error('User by token not found', err);
    callback({error: 'Invalid token'});
  }
};
