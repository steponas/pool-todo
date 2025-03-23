import {z} from 'zod';
import {db} from '../../db';
import {
  TodoStatus,
  TodoUpdateStatus,
  WSErrorResponse,
  WSUpdateTodoItemRequest,
  WSUpdateTodoItemResponse,
} from '../../../../types';
import {canMoveToStatus} from '../../../../common-utils/src/todo';
import {getSingleForUpdate} from './get';

const reqStruct = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  status: z.enum([TodoStatus.TODO, TodoStatus.ONGOING, TodoStatus.DONE]),
  lastUpdateTime: z.string().datetime(),
});

const conflicts = (existing: Date, input: Date) => {
  // A conflict is detected if the existing item is newer than the one which was being updated.
  return existing.valueOf() > input.valueOf();
}

export const updateTodo = async (data: WSUpdateTodoItemRequest, listId: number): Promise<WSUpdateTodoItemResponse | WSErrorResponse> => {
  const input = reqStruct.parse(data);

  const result: WSUpdateTodoItemResponse = {
    status: TodoUpdateStatus.OK
  };
  await db().transaction(async (tx) => {
    const existing = await getSingleForUpdate(input.id, tx);
    if (!existing) {
      throw new Error('Todo item not found');
    }
    if (existing.todoListId !== listId) {
      throw new Error('Todo item not part of list');
    }
    // Validate for conflict
    if (conflicts(existing.updatedAt as unknown as Date, new Date(input.lastUpdateTime))) {
      result.status = TodoUpdateStatus.CONFLICT;
      return;
    }
    // Validate transition
    if (!canMoveToStatus(existing.status, input.status)) {
      result.status = TodoUpdateStatus.INCORRECT_STATUS;
      return;
    }
    // all good, update the item
    await tx('todo_items').update({
      title: input.title,
      status: input.status,
      updated_at: new Date(),
    }).where('id', input.id);
  });

  return result;
}
