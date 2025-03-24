import {
  WSClientRequestTypes,
  WSDeleteTodoItemRequest,
  WSDeleteTodoItemResponse,
} from '../../../../types';
import {useWsMutation} from './ws-hooks';

export const useDeleteTodoMutation = () => {
  return useWsMutation<WSDeleteTodoItemRequest, WSDeleteTodoItemResponse>({
    event: WSClientRequestTypes.DELETE_TODO,
  });
};
