import {createUser} from './create';
import {getInTx, getUser} from './get';

export const UserModel = {
  create: createUser,
  get: getUser,
  getInTx,
};
