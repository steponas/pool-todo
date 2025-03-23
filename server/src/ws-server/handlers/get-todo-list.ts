import {Server, Socket} from 'socket.io';
import {z} from 'zod';
import {TodoListModel} from '../../model';
import {logger} from '../../log';
import {
  WSErrorResponse,
  WSGetListTodosRequest,
  WSGetListTodosResponse,
} from '../../../../types';

const reqSchema = z.object({
  code: z.string().min(1),
});

export const getTodoList = async (io: Server, client: Socket, data: WSGetListTodosRequest, callback: (r: WSGetListTodosResponse | WSErrorResponse) => unknown) => {
  try {
    const {code} = reqSchema.parse(data);
    const id = await TodoListModel.getIdByCode(code);
    if (!id) {
      throw new Error(`List not found for code: ${code}`);
    }
    callback({
      todos: await TodoListModel.getAllForList(id),
    })
  } catch (err) {
    logger.error('Failed to fetch TODOs for list: ', err);
    callback({error: 'Failed to fetch TODOs for list'});
  }
};
