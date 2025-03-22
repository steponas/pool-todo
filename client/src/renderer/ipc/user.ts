import {useMutation} from '@tanstack/react-query';
import {User} from '../../../../types';

interface StoreUserDataMutationArgs {
  user: User;
  token: string;
}

export const useStoreUserDataMutation = () => {
  return useMutation<void, Error, StoreUserDataMutationArgs>({
      mutationFn: ({user, token}) => {
        return window.todoApi.storeUserData(user, token).then(res => {
          if (res.error) {
            throw new Error('Failed to store user data: ' + res.error);
          }
        })
      },
    },
  );
}
