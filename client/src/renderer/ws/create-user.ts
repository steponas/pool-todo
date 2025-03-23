import {WSClientRequestTypes, WSCreateUserRequest, WSCreateUserResponse} from '../../../../types';
import {useWsMutation} from './ws-hooks';

export const useCreateUserWSMutation = () => {
  return useWsMutation<WSCreateUserRequest, WSCreateUserResponse>({
    event: WSClientRequestTypes.CREATE_USER,
  });
};
