import React from 'react';
import {Todo} from '../../../../../types';
import {useGetAllTodos} from '../../ws/get-list-todos';

interface Args {
  code: string;
}
interface Result {
  todoList: Todo[] | null;
  error: Error | null;
  isPending: boolean;
}

// This hook handles everything related to a TODO fetching.
export const useTodoStore = ({code}: Args): Result => {
  const [list, setList] = React.useState<Todo[]>([]);
  const [error, setError] = React.useState<Error | null>(null);
  const [isPending, setIsPending] = React.useState(false);

  const {
    data: initialTodos,
    isPending: initialTodosFetching,
    error: initialTodosError
  } = useGetAllTodos(code);

  // Fetch initial TODOs.
  React.useEffect(() => {
    if (!initialTodos) {
      return;
    }
    setList(initialTodos.todos);
  }, [initialTodos]);

  return {
    todoList: list,
    error: initialTodosError ?? error,
    isPending: initialTodosFetching || isPending,
  };
};
