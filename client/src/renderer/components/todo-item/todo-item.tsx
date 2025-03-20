import React from 'react';
import {Typography, Stack} from '@mui/material';
import {Todo} from '../../../../../types';
import {TodoIcon} from './todo-icon';
import {TodoWrapper} from './todo-wrapper';

interface Props {
  todo: Todo;
  inEdit: boolean;
  onStartEdit: () => void;
}

export const TodoItem: React.FC<Props> = ({todo, inEdit, onStartEdit}) => {
  return (
    <TodoWrapper
      inEdit={inEdit}
      onClick={inEdit ? null : onStartEdit}
    >
      <Stack spacing={2} direction="row" alignItems="center" sx={{mb: 1}}>
        <TodoIcon status={todo.status}/>
        <Typography variant="h6" sx={{flexGrow: 1}}>{todo.title}</Typography>
      </Stack>
      <Typography variant="subtitle2">{todo.createdBy.name} @ {todo.createdAt.toISOString()}</Typography>
    </TodoWrapper>
  );
};
