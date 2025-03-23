import {Server, Socket} from 'socket.io';
import {z} from 'zod';
import {
  WSErrorResponse,
  WSTodoListExistsRequest,
  WSTodoListExistsResponse,
} from '../../../../types';
import {logger} from '../../log';
import {TodoListModel} from '../../model';

const requestSchema = z.object({
  code: z.string().min(1),
});

export const validateListExists = async (io: Server, client: Socket, data: WSTodoListExistsRequest, callback: (r: WSTodoListExistsResponse | WSErrorResponse) => unknown) => {
  try {
    const {code} = requestSchema.parse(data);
    const exists = await TodoListModel.exists(code);
    callback({
      exists,
    });
    logger.info(`List "${code}" ${exists ? 'exists' : 'does not exist'}`);
  } catch (err) {
    logger.error('Failed to create a todo list', err);
    callback({error: 'Failed to create a list'});
  }
};
