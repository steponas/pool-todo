import {z} from 'zod';
import {db} from '../../db';
import {TodoStatus, WSCreateTodoItemRequest} from '../../../../types';
import {getSingle as getTodoItem} from './get';

interface MetaData {
  createdBy: string;
  listId: string;
}

const inputSchema = z.object({
  title: z.string().min(1),
});

export const createTodo = async (initialData: WSCreateTodoItemRequest, meta: MetaData) => {
  const input = inputSchema.parse(initialData);

  const res = await db().insert({
    title: input.title,
    status: TodoStatus.TODO,
    created_by: meta.createdBy,
    todo_list_id: meta.listId,
  }).into('todo_items').returning('id');

  return getTodoItem(res[0].id);
};
