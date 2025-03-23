import React from 'react';
import {useAuthenticateWSQuery} from '../../ws/authenticate';
import {Stack, Button} from '@mui/material';
import {Progress} from '../progress';
import {QueryError} from '../common/query-error';
import {useResetSettings} from '../../ipc';

interface Props {
  token: string;
  onAuthenticated: () => void;
  onReset: () => void;
}

// This is used to call token-based authentication, and render an error message if the token is invalid.
export const Auth: React.FC<Props> = ({token, onAuthenticated, onReset}) => {
  const {data, isPending, error} = useAuthenticateWSQuery(token);
  const {mutate: resetSettings} = useResetSettings({
    onSuccess: onReset,
  });

  React.useEffect(() => {
    if (data?.user) {
      onAuthenticated();
    }
  }, [data, onAuthenticated]);

  if (isPending || !error) {
    return (
      <Stack alignItems="center" justifyContent="center" sx={{height: '60%'}}>
        <Progress title="Waiting for authentication..."/>
      </Stack>
    );
  }
  if (error) {
    // TODO: a button which deletes the user data and reloads the app
    return <QueryError
      title="Failed to authenticate"
      error="Seems like your auth token is invalid."
      extra={<>{' '}To reset the app <Button variant="text" onClick={() => {
        resetSettings();
      }}>click here</Button>.</>}
    />;
  }
  return null;
};
