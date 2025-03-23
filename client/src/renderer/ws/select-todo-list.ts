import {
  WSClientRequestTypes,
  WSSelectTodoListRequest,
  WSSelectTodoListResponse,
} from '../../../../types';
import {useWsMutation} from './ws-hooks';

export const useSelectTodoList = () => {
  return useWsMutation<WSSelectTodoListRequest, WSSelectTodoListResponse>({
    event: WSClientRequestTypes.SELECT_LIST,
  });
};
