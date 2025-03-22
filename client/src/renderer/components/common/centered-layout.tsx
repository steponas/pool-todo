import React from 'react';
import {Card, CardContent, Stack, Typography} from '@mui/material';

interface Props {
  children: React.ReactNode;
}

export const CenteredLayout: React.FC<Props> = ({children}) => {
  return (
    <Stack alignItems="center" sx={{m: 3}}>
      <Typography variant="h2" sx={{mb: 4}}>TODO App</Typography>
      <Card sx={{maxWidth: 500}} variant="outlined">
        <CardContent sx={{textAlign: 'center'}}>
          {children}
        </CardContent>
      </Card>
    </Stack>
  );
};
