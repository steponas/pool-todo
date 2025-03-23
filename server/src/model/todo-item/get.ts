import {db} from '../../db';
import {Todo} from '../../../../types';

const todoQuery = () => db()
  .select({
    id: 'T.id',
    title: 'T.title',
    status: 'T.status',
    updatedAt: 'T.updated_at',
    createdAt: 'T.created_at',
    createdBy: 'U.name',
  })
  .from({ T: 'todo_items' })
  .innerJoin({ U: 'users' }, 'T.created_by', 'U.id');

export const getAllForList = async (id: number): Promise<Todo[]> => {
  return await todoQuery().where('T.todo_list_id', id)
}

export const getSingle = async (id: string): Promise<Todo> => {
  return await todoQuery().first().where('T.id', id);
};
