import React from 'react';
import {Stack} from '@mui/material';
import {TodoUpdate} from '../../../../../types';
import {TodoItem, NewTodoItem} from '../todo-item';
import {Empty} from './empty';
import {useAppContext} from '../../context';
import {TodoEdit} from '../todo-edit';
import {useTodoStore} from '../app/todo-store';
import {Progress} from '../progress';
import {QueryError} from '../common/query-error';

export const TodoList = () => {
  const ctx = useAppContext();
  const {todoList, isPending, error} = useTodoStore({
    code: ctx.list.code,
  });

  if (isPending) {
    return (
      <Stack alignItems="center" justifyContent="center" sx={{height: '60%'}}>
        <Progress title="Loading TODOs..."/>
      </Stack>
    );
  }
  if (error) {
    return (
      <Stack alignItems="center" justifyContent="center" sx={{height: '60%'}}>
        <QueryError title="Failed to load TODOs" error={error}/>
      </Stack>
    );
  }

  const items = todoList?.map((todo) => {
    if (todo.id === ctx.editedId) {
      // For edit, show the edit component
      return (
        <TodoEdit
          key={todo.id}
          initialTitle={todo.title}
          initialStatus={todo.status}
          onSave={(update: TodoUpdate) => {
            console.log('Updating todo:', update);
            ctx.onCancelEdit();
          }}
          onDelete={() => {
            console.log('Deleting todo:', todo.id);
            ctx.onCancelEdit();
          }}
          onCancel={ctx.onCancelEdit}
        />
      )
    }
    return (
      <TodoItem
        key={todo.id}
        todo={todo}
        onStartEdit={() => ctx.onEdit(todo.id)}
      />
    )
  });
  if (ctx.isNewTodo) {
    items.unshift(<NewTodoItem key="new-todo"/>);
  }

  let content;
  if (items?.length === 0) {
    content = <Empty/>;
  } else {
    content = <>{items}</>;
  }

  return (
    <Stack spacing={2} sx={{p: 3}}>
      {content}
    </Stack>
  );
};
