import {useWsQuery, UseWsQueryOptions} from './ws-hooks';
import {
  WSClientRequestTypes,
  WSGetListTodosRequest,
  WSGetListTodosResponse,
} from '../../../../types';

export const useGetAllTodos = (listCode: string) => {
  return useWsQuery<WSGetListTodosRequest, WSGetListTodosResponse>({
    event: WSClientRequestTypes.GET_LIST_TODOS,
    variables: {code: listCode},
  });
};
