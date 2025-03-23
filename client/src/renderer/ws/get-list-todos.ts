import {useWsQuery} from './ws-hooks';
import {
  WSClientRequestTypes,
  WSGetListTodosResponse,
} from '../../../../types';

export const useGetAllTodos = () => {
  return useWsQuery<void, WSGetListTodosResponse>({
    event: WSClientRequestTypes.GET_LIST_TODOS,
  });
};
