import React from 'react';
import {Button, IconButton, Stack, TextField, Tooltip} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import {TodoStatus, TodoUpdate} from '../../../../../types';
import {TodoWrapper} from '../todo-common';
import {TodoStatusEdit} from './todo-status-edit';

interface Props {
  initialTitle: string;
  initialStatus: TodoStatus;
  onSave: (update: TodoUpdate) => void;
  onCancel: () => void;
  // Delete button is shown only when this props is provided
  onDelete?: () => void;
}

export const TodoEdit: React.FC<Props> = ({initialTitle, initialStatus, onCancel, onDelete, onSave}) => {
  const [title, setTitle] = React.useState(initialTitle);
  const [status, setStatus] = React.useState(initialStatus);

  const save = () => {
    onSave({
      title,
      status,
    });
  };

  return (
    <TodoWrapper inEdit={true}>
      <TextField
        placeholder="Enter the title"
        multiline
        maxRows={4}
        variant="standard"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        sx={{width: '100%', mb: 2}}
      />
      {onDelete && <TodoStatusEdit status={status} onChange={setStatus} sx={{mb: 2}}/>}
      <Stack direction="row" justifyContent="space-between">
        <Button variant="contained" color="primary" onClick={save}>Save</Button>
        <Stack direction="row" justifyContent="space-between" spacing={2}>
          {onDelete && (
            <Tooltip title="Delete this TODO">
              <IconButton aria-label="delete" onClick={onDelete} color="error">
                <DeleteIcon/>
              </IconButton>
            </Tooltip>
          )}
          <Button variant="contained" color="warning" onClick={onCancel}>Cancel</Button>
        </Stack>
      </Stack>
    </TodoWrapper>
  );
};
