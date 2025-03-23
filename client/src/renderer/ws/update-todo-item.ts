import {
  WSClientRequestTypes,
  WSUpdateTodoItemRequest,
  WSUpdateTodoItemResponse,
} from '../../../../types';
import {useWsMutation} from './ws-hooks';

export const useUpdateTodoMutation = () => {
  return useWsMutation<WSUpdateTodoItemRequest, WSUpdateTodoItemResponse>({
    event: WSClientRequestTypes.UPDATE_TODO,
  });
};
