import {useWsQuery} from './ws-hooks';
import {WSAuthenticateRequest, WSAuthenticateResponse, WSClientRequestTypes} from '../../../../types';

export const useAuthenticateWSQuery = (token: string) => {
  return useWsQuery<WSAuthenticateRequest, WSAuthenticateResponse>({
    event: WSClientRequestTypes.TOKEN_AUTH,
    variables: {token},
    options: {
      retry: true,
    },
  });
};
