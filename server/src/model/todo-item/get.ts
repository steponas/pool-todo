import {db, Transaction} from '../../db';
import {Todo} from '../../../../types';

const todoQuery = () => db()
  .select({
    id: 'T.id',
    title: 'T.title',
    status: 'T.status',
    todoListId: 'T.todo_list_id',
    updatedAt: 'T.updated_at',
    createdAt: 'T.created_at',
    createdBy: 'U.name',
  })
  .from({T: 'todo_items'})
  .innerJoin({U: 'users'}, 'T.created_by', 'U.id');

export const getAllForList = async (id: number): Promise<Todo[]> => {
  return await todoQuery().where('T.todo_list_id', id)
}

export const getSingle = async (id: string): Promise<Todo | null> => {
  return await todoQuery().first().where('T.id', id);
};

export const getSingleForUpdate = async (id: string, tx: Transaction): Promise<Todo | null> => {
  return await todoQuery().first().where('T.id', id).transacting(tx).forUpdate();
}
