import React from 'react';
import {Typography, TextField, Button} from '@mui/material';
import {User} from '../../../../../types';
import {CenteredLayout} from '../common';

interface Props {
  onCreated: (u: User, token: string) => void;
}

export const UserCreation: React.FC<Props> = ({onCreated}) => {
  const [name, setName] = React.useState('');
  const [inputError, setInputError] = React.useState(false);
  const save = () => {
    if (!name) {
      setInputError(true);
      return;
    }
    onCreated({name, id: 'test123'}, 'token');
  };
  return (
    <CenteredLayout>
      <Typography variant="h2" fontSize="x-large">Welcome! 👋 Please enter your name:</Typography>
      <TextField
        placeholder="Your name"
        onChange={(e) => {
          setName(e.target.value);
          setInputError(!e.target.value);
        }}
        value={name}
        fullWidth sx={{mt: 2, mb: 2}}
        error={inputError}
        onKeyPress={(e) => {
          if (e.key === 'Enter') {
            save();
          }
        }}
        helperText={inputError ? 'Please enter your name.' : undefined}
      />
      <Button variant="contained" color="primary" onClick={save}>
        Next &rarr;
      </Button>
    </CenteredLayout>
  )
};
