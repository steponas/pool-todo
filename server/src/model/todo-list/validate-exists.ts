import {db} from '../../db';

export const validateTodoListExists = async (code: string): Promise<boolean> => {
  const res = await db().from('todo_lists').first('id').where({code});
  return !!res;
};
