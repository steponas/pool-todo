import React from 'react';
import {Typography, Stack} from '@mui/material';
import {Todo} from '../../../../../types';
import {TodoIcon, TodoWrapper} from '../todo-common';

interface Props {
  todo: Todo;
  onStartEdit: () => void;
}

export const TodoItem: React.FC<Props> = ({todo, onStartEdit}) => {
  return (
    <TodoWrapper
      inEdit={false}
      onClick={onStartEdit}
    >
      <Stack spacing={2} direction="row" alignItems="center" sx={{mb: 1}}>
        <TodoIcon status={todo.status}/>
        <Typography variant="h6" sx={{flexGrow: 1, whiteSpace: 'pre-line'}}>{todo.title}</Typography>
      </Stack>
      <Typography variant="subtitle2">{todo.createdBy.name} @ {todo.createdAt.toISOString()}</Typography>
    </TodoWrapper>
  );
};
