import {db} from '../../db';

export const findUserIdByToken = async (token: string): Promise<string | null> => {
  const res = await db().first('user_id').from('user_tokens').where('token', token);
  return res?.user_id ?? null;
}
