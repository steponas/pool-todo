import React from 'react';
import {useAppContext} from '../../context';
import {TodoEdit} from '../todo-edit';
import {TodoStatus, TodoUpdate} from '../../../../../types';

export const NewTodoItem = () => {
  const ctx = useAppContext();

  const createTodo = (todo: TodoUpdate) => {
    console.log('Creating todo:', todo);
    ctx.onCancelEdit();
  };

  return (
    <TodoEdit
      initialTitle=""
      initialStatus={TodoStatus.TODO}
      onCancel={ctx.onCancelEdit}
      onSave={createTodo}
    />
  );
}
