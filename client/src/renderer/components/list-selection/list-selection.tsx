import React from 'react';
import {Typography, TextField, Button, Divider, Grid2} from '@mui/material';
import {TodoList} from '../../../../../types';
import {CenteredLayout} from '../common';
import {useStoreTodoListMutation} from '../../ipc/todo-list';
import {QueryError} from '../common/query-error';

interface Props {
  onSelected: (l: TodoList) => void;
}

export const ListSelection: React.FC<Props> = ({onSelected}) => {
  const [code, setCode] = React.useState('');
  const [inputError, setInputError] = React.useState(false);
  const {mutate: storeList, error: storeListError, isPending} = useStoreTodoListMutation();
  const storeListToSettings = (list: TodoList) => {
    storeList({list}, {
      onSuccess: () => {
        onSelected(list);
      }
    });
  }
  const createNewList = () => {
    storeListToSettings({id: 'new-123123', name: 'test?'});
  };
  const selectExistingList = () => {
    if (code?.length < 3) {
      setInputError(true);
      return;
    }
    storeListToSettings({id: code, name: 'test?'});
  };
  return (
    <CenteredLayout>
      <QueryError title="Failed to store the list locally" error={storeListError}/>
      <Typography variant="h6" sx={{mb: 4}}>The TODOs you write are part of a list.</Typography>
      <Grid2 container spacing={1}>
        <Grid2 size={5} sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          <Button variant="contained" color="primary" onClick={createNewList} disabled={isPending}>
            Create a list &rarr;
          </Button>
        </Grid2>
        <Grid2 size={2} sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          <Divider orientation="vertical" flexItem>or</Divider>
        </Grid2>
        <Grid2 size={5}>
          <Typography variant="body2">Enter the code for an existing list:</Typography>
          <TextField
            placeholder="Code"
            onChange={(e) => {
              setCode(e.target.value);
              setInputError(!e.target.value);
            }}
            value={code}
            fullWidth sx={{mt: 2, mb: 2}}
            error={inputError}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                selectExistingList();
              }
            }}
            helperText={inputError ? 'Please enter the code' : undefined}
            size="small"
            disabled={isPending}
          />
          <Button variant="contained" color="secondary" onClick={selectExistingList} disabled={isPending}>
            Continue &rarr;
          </Button>
        </Grid2>
      </Grid2>
    </CenteredLayout>
  )
};
