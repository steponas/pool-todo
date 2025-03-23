import React from 'react';
import {useAuthenticateWSQuery} from '../../ws/authenticate';
import {Stack} from '@mui/material';
import {Progress} from '../progress';
import {QueryError} from '../common/query-error';

interface Props {
  token: string;
  onAuthenticated: () => void;
}

// This is used to call token-based authentication, and render an error message if the token is invalid.
export const Auth: React.FC<Props> = ({token, onAuthenticated}) => {
  const {data, isPending, error} = useAuthenticateWSQuery(token);

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
    console.log(error);
    // TODO: a button which deletes the user data and reloads the app
    return <QueryError title="Failed to authenticate" error="Seems like your auth token is invalid."/>;
  }
  return null;
};
