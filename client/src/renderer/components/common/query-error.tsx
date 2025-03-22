import React from 'react';
import {Alert, AlertTitle} from '@mui/material';

interface Props {
  error: Error | string;
  title?: React.ReactNode;
}

export const getErrorText = (error: Error | string): string => {
  if (typeof error === 'string') {
    return error;
  }
  return error.message;
}

export const QueryError: React.FC<Props> = ({error, title}) => {
  if (!error) {
    return null;
  }
  return (
    <Alert severity="error" sx={{mb: 2}}>
      {title && (
        <AlertTitle>{title}</AlertTitle>
      )}
      {getErrorText(error)}
    </Alert>
  );
}
