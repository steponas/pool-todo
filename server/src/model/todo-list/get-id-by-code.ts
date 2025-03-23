import {db} from '../../db';

export const getIdByCode = async (code: string): Promise<number | null> => {
  const res = await db().from('todo_lists').first('id').where({code});
  return res?.id ?? null;
}
