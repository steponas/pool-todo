import React from 'react';
import {Typography, TextField, Button} from '@mui/material';
import {User} from '../../../../../types';
import {CenteredLayout} from '../common';
import {useStoreUserDataMutation} from '../../ipc';
import {QueryError} from '../common/query-error';
import {useCreateUserWSMutation} from '../../ws';

interface Props {
  onCreated: (u: User, token: string) => void;
}

export const UserCreation: React.FC<Props> = ({onCreated}) => {
  const {mutateAsync: createUser, error: createUserError, isPending: isCreating} = useCreateUserWSMutation();
  const {mutateAsync: storeUser, error: storeUserError, isPending: isStoring} = useStoreUserDataMutation();
  const [name, setName] = React.useState('');
  const [inputError, setInputError] = React.useState(false);
  const save = async () => {
    if (!name) {
      setInputError(true);
      return;
    }
    try {
      const data = await createUser({name});
      // Store user in application settings
      await storeUser(data);
      onCreated(data.user, data.token);
    } catch(e) {
      // Not handling, the error is already displayed in the UI
    }
  };

  const isLoading = isCreating || isStoring;

  return (
    <CenteredLayout>
      <QueryError title="Failed to create user" error={createUserError}/>
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
        disabled={isLoading}
      />
      <Button variant="contained" color="primary" onClick={save} disabled={isLoading}>
        Next &rarr;
      </Button>
    </CenteredLayout>
  )
};
