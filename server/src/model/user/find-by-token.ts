import {User} from '../../../../types';
import {TokenModel} from '../token';
import {getUser} from './get';

export const findByToken = async (token: string): Promise<User | null> => {
  const userId = await TokenModel.findUserIdByToken(token);
  if (!userId) {
    return null;
  }
  return await getUser(userId);
}
