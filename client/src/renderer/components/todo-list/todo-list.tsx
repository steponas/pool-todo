import React from 'react';
import {Stack} from '@mui/material';
import {Todo, TodoStatus} from '../../../../../types';
import {TodoItem, NewTodoItem} from '../todo-item';
import {Empty} from './empty';
import {useAppContext} from '../../context';

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
    title: 'Third todo. Nice long list. Some powerful things. Wowo.',
    updatedAt: new Date(),
    status: TodoStatus.DONE,
  },
];

export const TodoList = () => {
  const ctx = useAppContext();

  const items = mockData.map((todo) => (
    <TodoItem
      todo={todo}
      key={todo.id}
      inEdit={todo.id === ctx.editedId}
      onStartEdit={() => ctx.onEdit(todo.id)}
    />
  ));
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
