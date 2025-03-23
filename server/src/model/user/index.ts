import {createUser} from './create';
import {getInTx, getUser} from './get';
import {findByToken} from './find-by-token';

export const UserModel = {
  create: createUser,
  get: getUser,
  getInTx,
  findByToken,
};
