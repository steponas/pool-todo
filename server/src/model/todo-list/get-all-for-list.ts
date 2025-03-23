import {db} from '../../db';

export const getAllForList = (id: number) => {
  return db().from('todo_items').where('todo_list_id', id).select('id', 'name', 'status', {
    updatedAt: 'updated_at',
    createdAt: 'created_at',
    createdBy: 'created_by',
  });
}
