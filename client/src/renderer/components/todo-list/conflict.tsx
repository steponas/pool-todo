import React from 'react';
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from '@mui/material';

interface Props {
  onOverride: () => void;
  onCancel: () => void;
}

export const TodoConflict: React.FC<Props> = ({onOverride, onCancel}) => {
  return (
    <Dialog
      open
      onClose={onCancel}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        Conflict detected
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Another user has modified the TODO you are trying to edit.
          <br />
          What would you like to do?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onOverride}>Override</Button>
        <Button onClick={onCancel} color="error">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};
