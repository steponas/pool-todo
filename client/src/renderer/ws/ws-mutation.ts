import {useMutation} from '@tanstack/react-query';
import {WSClientRequestTypes} from '../../../../types';
import {getSocket} from './socket';
import {WS_TIMEOUT} from './config';

interface Args {
  event: WSClientRequestTypes;
}

export const useWsMutation = <Request, Response>({event}: Args) => {
  return useMutation<Response, Error, Request>({
      mutationFn: async (data) => {
        const resp = await getSocket().timeout(WS_TIMEOUT).emitWithAck(event, data);
        // Handle error response
        if (resp.error) {
          throw new Error(resp.error);
        }
        return resp;
      },
    },
  );
}
