import {Server, Socket} from 'socket.io';
import {z} from 'zod';
import {
  WSErrorResponse,
  WSSelectTodoListRequest,
  WSSelectTodoListResponse,
} from '../../../../types';
import {logger} from '../../log';
import {TodoListModel} from '../../model';

const requestSchema = z.object({
  code: z.string().min(1),
});

export const selectTodoListForUser = async (io: Server, client: Socket, data: WSSelectTodoListRequest, callback: (r: WSSelectTodoListResponse | WSErrorResponse) => unknown) => {
  try {
    const {code} = requestSchema.parse(data);
    const id = await TodoListModel.getIdByCode(code);
    if (!id) {
      logger.warn(`List not found for code: ${code}`);
      return callback({error: 'List not found'});
    }
    client.data.todoList = { id, code };
    callback({});
    logger.info(`List "${code}" assigned to user ${client.data.user.name}`);
  } catch (err) {
    logger.error('Failed to assign the todo list:', err);
    callback({error: 'Failed to assign the list'});
  }
};
