import React from 'react';
import {LinearProgress, Stack, Box, Typography} from '@mui/material';

interface Props {
  title?: React.ReactNode;
}

export const Progress: React.FC<Props> = ({title}) => {
  const titleComp = title ? <Typography variant="h6">{title}</Typography> : null;
  return (
    <Stack direction="column" alignItems="center" spacing={2} sx={{minWidth: '50%'}}>
      {titleComp}
      <Box sx={{width: '100%'}}><LinearProgress/></Box>
    </Stack>
  );
};
