import {z} from 'zod';
import {getSingle} from './get';
import {db} from '../../db';
import {WSDeleteTodoItemRequest, WSDeleteTodoItemResponse} from '../../../../types';

const reqStruct = z.object({
  id: z.string().min(1),
});

export const deleteTodo = async (data: WSDeleteTodoItemRequest, listId: number): Promise<WSDeleteTodoItemResponse> => {
  const {id} = reqStruct.parse(data);
  const todo = await getSingle(id);
  if (!todo) {
    throw new Error(`Todo#${id} not found for deletion`);
  }

  if (todo.todoListId !== listId) {
    throw new Error(`Todo#${id} does not belong to the user's list`);
  }

  await db().delete().from('todo_items').where('id', id);

  return {};
}
