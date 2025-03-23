import React from 'react';
import {Todo, WSServerPushTypes} from '../../../../../types';
import {useGetAllTodos} from '../../ws/get-list-todos';
import {getSocket} from '../../ws/socket';

interface Result {
  todoList: Todo[] | null;
  error: Error | null;
  isPending: boolean;
}

// This hook handles everything related to a TODO fetching.
export const useTodoStore = (): Result => {
  const [list, setList] = React.useState<Todo[]>([]);

  const {
    data: initialTodos,
    isPending,
    error,
    refetch,
  } = useGetAllTodos();

  // Fetch initial TODOs.
  React.useEffect(() => {
    if (!initialTodos) {
      return;
    }
    setList(initialTodos.todos);
  }, [initialTodos]);

  // Bind to list update events
  React.useEffect(() => {
    const updater = () => {
      refetch().catch(err => {
        // Ignore, but don't error.
      });
    };
    // Subscribe to updates
    getSocket().on(WSServerPushTypes.LIST_UPDATED, updater);
    return () => {
      getSocket().off(WSServerPushTypes.LIST_UPDATED, updater);
    }
  }, [refetch]);

  return {
    todoList: list,
    error,
    isPending,
  };
};
