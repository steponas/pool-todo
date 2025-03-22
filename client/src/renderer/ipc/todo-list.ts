import {useMutation} from '@tanstack/react-query';
import {TodoList} from '../../../../types';

interface StoreTodoListMutationArgs {
  list: TodoList;
}

export const useStoreTodoListMutation = () => {
  return useMutation<void, Error, StoreTodoListMutationArgs>({
      mutationFn: ({list}) => {
        return window.todoApi.storeTodoList(list).then(res => {
          if (res.error) {
            throw new Error('Failed to store TODO list: ' + res.error);
          }
        })
      },
    },
  );
}
