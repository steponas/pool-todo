import {
  WSClientRequestTypes,
  WSTodoListExistsRequest,
  WSTodoListExistsResponse,
} from '../../../../types';
import {useWsMutation} from './ws-hooks';

export const useValidateTodoList = () => {
  return useWsMutation<WSTodoListExistsRequest, WSTodoListExistsResponse>({
    event: WSClientRequestTypes.VALIDATE_LIST_EXISTS,
  });
};
