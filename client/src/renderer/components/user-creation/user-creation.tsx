import React from 'react';
import {Typography, TextField, Button} from '@mui/material';
import {User} from '../../../../../types';
import {CenteredLayout} from '../common';
import {useStoreUserDataMutation} from '../../ipc';
import {QueryError} from '../common/query-error';

interface Props {
  onCreated: (u: User, token: string) => void;
}

export const UserCreation: React.FC<Props> = ({onCreated}) => {
  const {mutate: storeUser, error: storeUserError, isPending} = useStoreUserDataMutation();
  const [name, setName] = React.useState('');
  const [inputError, setInputError] = React.useState(false);
  const save = () => {
    if (!name) {
      setInputError(true);
      return;
    }
    // TODO: save user in backend, get response here
    const tempUser = {name, id: 'mock123'};
    const tempToken = 'mock-token';
    // Store user in application settings
    storeUser({user: tempUser, token: tempToken}, {
      onSuccess: () => {
        onCreated(tempUser, tempToken);
      }
    });
  };

  return (
    <CenteredLayout>
      <QueryError title="Failed to store user data locally" error={storeUserError}/>
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
        disabled={isPending}
      />
      <Button variant="contained" color="primary" onClick={save}>
        Next &rarr;
      </Button>
    </CenteredLayout>
  )
};
