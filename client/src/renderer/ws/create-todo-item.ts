import {
  WSClientRequestTypes,
  WSCreateTodoItemRequest,
  WSCreateTodoItemResponse,
} from '../../../../types';
import {useWsMutation} from './ws-hooks';

export const useCreateTodoItem = () => {
  return useWsMutation<WSCreateTodoItemRequest, WSCreateTodoItemResponse>({
    event: WSClientRequestTypes.CREATE_TODO,
  });
};
