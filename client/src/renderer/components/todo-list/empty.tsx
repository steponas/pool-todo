import React from 'react';
import {Stack, Card, CardContent, Typography} from '@mui/material';
import TravelExploreTwoToneIcon from '@mui/icons-material/TravelExploreTwoTone';
import {useAppContext} from '../../context';

export const Empty = () => {
  const ctx= useAppContext();
  return (
    <Stack alignItems="center">
      <Card sx={{maxWidth: 500, cursor: 'pointer'}} onClick={ctx.onNewTodo}>
        <CardContent sx={{textAlign: 'center'}}>
          <TravelExploreTwoToneIcon sx={{fontSize: 150}} color="primary"/>
          <Typography variant="body2" fontSize="x-large">Click here to add a new TODO.</Typography>
        </CardContent>
      </Card>
    </Stack>
  );
}
