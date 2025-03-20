import React from 'react';
import {TodoWrapper} from './todo-wrapper';
import {TextField, Stack, Button} from '@mui/material';
import {useAppContext} from '../../context';

export const NewTodoItem = () => {
  const ctx = useAppContext();
  const [value, setValue] = React.useState('');

  const createTodo = () => {
    // TODO: create a new TODO
    ctx.onCancelEdit();
  };

  return (
    <TodoWrapper inEdit={true}>
      <TextField
        id="standard-multiline-flexible"
        label="TODO title"
        multiline
        maxRows={4}
        variant="standard"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        sx={{width: '100%', mb: 2}}
      />
      <Stack direction="row" justifyContent="space-between">
        <Button variant="contained" color="primary" onClick={createTodo}>Save</Button>
        <Button variant="contained" color="warning" onClick={ctx.onCancelEdit}>Cancel</Button>
      </Stack>
    </TodoWrapper>
  );
}
