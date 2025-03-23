import {
  WSClientRequestTypes,
  WSListCreatedResponse
} from '../../../../types';
import {useWsMutation} from './ws-hooks';

export const useCreateTodoList = () => {
  return useWsMutation<void, WSListCreatedResponse>({
    event: WSClientRequestTypes.CREATE_LIST,
  });
};
