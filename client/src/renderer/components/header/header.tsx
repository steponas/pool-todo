import React from 'react';
import {Box, Stack, Typography, Button} from '@mui/material';
import PlusOneIcon from '@mui/icons-material/PlusOne';
import {blue} from '@mui/material/colors';
import {useAppContext} from '../../context';

export const Header = () => {
  const ctx = useAppContext();

  return (
    <Box sx={{p: 2, background: blue[300], color: 'white'}}>
      <Stack justifyContent="space-between" direction="row" alignItems="center" spacing={2}>
        <Stack justifyContent="space-between" direction="column" alignItems="flex-start">
          <Typography
            variant="h5"
            sx={{whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden'}}
          >
            {ctx.currentUser.name}&apos;s
            TODOs
          </Typography>
          <Typography variant="subtitle2" sx={{color: t => t.palette.grey[200]}}>
            List code: {ctx.list?.code}
          </Typography>
        </Stack>
        <Button
          startIcon={<PlusOneIcon/>}
          variant="contained"
          color="primary"
          onClick={ctx.onNewTodo}
          sx={{whiteSpace: 'nowrap', flexShrink: 0}}
        >
          New TODO
        </Button>
      </Stack>
    </Box>
  );
};
