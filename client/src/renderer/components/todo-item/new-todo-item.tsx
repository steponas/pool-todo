import React from 'react';
import {useAppContext} from '../../context';
import {TodoEdit} from '../todo-edit';
import {TodoStatus, TodoUpdate} from '../../../../../types';
import {useCreateTodoItem} from '../../ws/create-todo-item';

export const NewTodoItem = () => {
  const ctx = useAppContext();
  const {mutate, isPending, error} = useCreateTodoItem();

  const createTodo = (todo: TodoUpdate) => {
    mutate({title: todo.title}, {
      onSuccess: () => {
        ctx.onCancelEdit();
      },
    });
  };

  return (
    <TodoEdit
      initialTitle=""
      initialStatus={TodoStatus.TODO}
      onCancel={ctx.onCancelEdit}
      onSave={createTodo}
      error={error}
      isLoading={isPending}
    />
  );
}
