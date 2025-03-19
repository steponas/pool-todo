import React from 'react';
import {Typography, Stack, Card, CardContent} from '@mui/material';
import {Todo} from "../../../../../types";
import {TodoIcon} from "./todo-icon";

interface Props {
  todo: Todo;
  inEdit: boolean;
}

export const TodoItem: React.FC<Props> = ({todo, inEdit}) => {
  return (
    <Card variant="outlined" sx={{
      cursor: inEdit ? 'default' : 'pointer',
    }}>
      <CardContent>
        <Stack spacing={2} direction="row">
          <TodoIcon status={todo.status}/>
          <Typography variant="h6" sx={{flexGrow: 1}}>{todo.title}</Typography>
        </Stack>
        <Typography variant="subtitle2">{todo.createdBy.name} @ {todo.createdAt.toISOString()}</Typography>
      </CardContent>
    </Card>
  )
};
