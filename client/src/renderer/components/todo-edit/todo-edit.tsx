import React from 'react';
import {Button, IconButton, Stack, TextField, Tooltip} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import {TodoStatus, TodoUpdate} from '../../../../../types';
import {TodoWrapper} from '../todo-common';
import {TodoStatusEdit} from './todo-status-edit';
import {QueryError} from '../common/query-error';

interface Props {
  initialTitle: string;
  initialStatus: TodoStatus;
  onSave: (update: TodoUpdate) => void;
  isLoading: boolean;
  error?: Error | string;
  onCancel: () => void;
  // Delete button is shown only when this props is provided
  onDelete?: () => void;
}

export const TodoEdit: React.FC<Props> = (props) => {
  const {initialTitle, initialStatus, onCancel, onDelete, onSave, isLoading, error} = props;
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
      <QueryError title="Failed to save" error={error}/>
      <TextField
        placeholder="Enter the title"
        multiline
        variant="standard"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        sx={{width: '100%', mb: 2}}
        disabled={isLoading}
      />
      {onDelete && <TodoStatusEdit status={status} onChange={setStatus} sx={{mb: 2}} disabled={isLoading}/>}
      <Stack direction="row" justifyContent="space-between">
        <Button variant="contained" color="primary" onClick={save} disabled={isLoading}>Save</Button>
        <Stack direction="row" justifyContent="space-between" spacing={2}>
          {onDelete && (
            <Tooltip title="Delete this TODO">
              <IconButton aria-label="delete" onClick={onDelete} color="error" disabled={isLoading}>
                <DeleteIcon/>
              </IconButton>
            </Tooltip>
          )}
          <Button variant="contained" color="warning" onClick={onCancel} disabled={isLoading}>Cancel</Button>
        </Stack>
      </Stack>
    </TodoWrapper>
  );
};
