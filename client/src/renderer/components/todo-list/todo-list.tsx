import React from 'react';
import {Stack} from '@mui/material';
import {Todo, TodoStatus, TodoUpdate} from '../../../../../types';
import {TodoItem, NewTodoItem} from '../todo-item';
import {Empty} from './empty';
import {useAppContext} from '../../context';
import {TodoEdit} from '../todo-edit';

const mockData: Todo[] = [
  {
    id: '1',
    createdAt: new Date(),
    createdBy: {
      id: '1',
      name: 'John Doe',
    },
    title: 'First todo',
    updatedAt: new Date(),
    status: TodoStatus.ONGOING,
  },
  {
    id: '2',
    createdAt: new Date(),
    createdBy: {
      id: '1',
      name: 'John Doe',
    },
    title: 'Second todo',
    updatedAt: new Date(),
    status: TodoStatus.TODO,
  },
  {
    id: '3',
    createdAt: new Date(),
    createdBy: {
      id: '131',
      name: 'James Smith',
    },
    title: 'Third todo. Nice long list. Some powerful things\n\nWowo.',
    updatedAt: new Date(),
    status: TodoStatus.DONE,
  },
];

export const TodoList = () => {
  const ctx = useAppContext();

  const items = mockData.map((todo) => {
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
  if (items.length === 0) {
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
