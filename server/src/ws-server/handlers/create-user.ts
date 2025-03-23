import {Server, Socket} from 'socket.io';
import {User, WSCreateUserRequest, WSCreateUserResponse, WSErrorResponse} from '../../../../types';
import {UserModel,TokenModel} from '../../model';
import {db} from '../../db';
import {logger} from '../../log';

export const createUser = async (io: Server, client: Socket, data: WSCreateUserRequest, callback: (r: WSCreateUserResponse | WSErrorResponse) => unknown) => {
  try {
    let user: User;
    let token: string;
    await db().transaction(async (tx) => {
      const id = await UserModel.create(tx, {name: data.name});
      user = await UserModel.getInTx(tx, id);
      token = await TokenModel.createForUser(tx, id);
    });
    callback({user, token});
  } catch (err) {
    logger.error('Failed to create user', err);
    callback({error: 'Failed to create user'});
  }
};
