import {useQuery, useMutation, UseQueryOptions} from '@tanstack/react-query';
import {WSClientRequestTypes} from '../../../../types';
import {getSocket} from './socket';
import {WS_TIMEOUT} from './config';

interface MutateArgs {
  event: WSClientRequestTypes;
}

export const useWsMutation = <Request, Response>({event}: MutateArgs) => {
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

export type UseWsQueryOptions = Pick<UseQueryOptions, 'retry' | 'refetchInterval' | 'retryDelay' | 'enabled'>;

interface QueryArgs<Data> {
  event: WSClientRequestTypes;
  variables?: Data;
  options?: UseWsQueryOptions,
}

export const useWsQuery = <Request, Response>({event, variables, options}: QueryArgs<Request>) => {
  return useQuery<Request, Error, Response>({
      ...(options || {}),
      queryKey: ['ws', event, variables],
      queryFn: async () => {
        const resp = await getSocket().timeout(WS_TIMEOUT).emitWithAck(event, variables);
        // Handle error response
        if (resp.error) {
          throw new Error(resp.error);
        }
        return resp;
      },
      retry: false,
      gcTime: 0,
    },
  );
}
