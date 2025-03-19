import React from 'react';
import {Stack} from '@mui/material';
import {Todo, TodoStatus} from "../../../../../types";
import {TodoItem} from "../todo-item";

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
];


export const TodoList = () => {
  // TODO: button to add new TODO
  // TODO header which greets the user and shows the number of todos
  return (
    <Stack spacing={2} sx={{p: 3}}>
      {mockData.map((todo) => (
        <TodoItem todo={todo} key={todo.id} inEdit={false}/>
      ))}
    </Stack>
  );
};
