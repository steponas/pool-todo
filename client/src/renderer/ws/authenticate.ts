import {useWsQuery} from './ws-hooks';
import {WSAuthenticateRequest, WSAuthenticateResponse, WSClientRequestTypes} from '../../../../types';

export const useAuthenticateWSQuery = (token: string, listCode: string | null) => {
  return useWsQuery<WSAuthenticateRequest, WSAuthenticateResponse>({
    event: WSClientRequestTypes.TOKEN_AUTH,
    variables: {token, listCode},
    options: {
      retry: true,
    },
  });
};
