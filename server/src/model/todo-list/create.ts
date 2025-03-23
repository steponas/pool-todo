import {db} from '../../db';
import {TodoList} from '../../../../types';

interface Args {
  createdBy: string;
}

export const createTodoList = async ({createdBy}: Args): Promise<TodoList> => {
  let id: number;
  let code: string;
  await db().transaction(async tx => {
    // Lock the table to prevent conflicts
    await tx.raw('LOCK TABLE todo_lists IN EXCLUSIVE MODE');
    // Generate the list id.
    // Should be something more random, but for the sake of testability let's keep it simple.
    const maxData = await tx.first('id').from('todo_lists').orderBy('id', 'desc');
    id = maxData ? maxData.id + 1 : 1;
    code = 'list-' + id;
    await tx.insert({
      id,
      created_by: createdBy,
      code,
    }).into('todo_lists');
    // Unlock not needed in postgresql - commit will release the lock
  });
  return {id, code};
};
