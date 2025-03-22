import React from 'react';
import {ToggleButton, ToggleButtonGroup, SxProps} from '@mui/material';
import {TodoStatus} from '../../../../../types';
import {TodoIcon} from '../todo-common';
import {canMoveToStatus} from '../../../../../common-utils/src/todo';

interface Props {
  status: TodoStatus;
  onChange: (s: TodoStatus) => void;
  sx?: SxProps;
}

const todoButtons = [
  {status: TodoStatus.TODO, label: 'Todo'},
  {status: TodoStatus.ONGOING, label: 'Ongoing'},
  {status: TodoStatus.DONE, label: 'Done'},
];

export const TodoStatusEdit: React.FC<Props> = ({status, onChange, sx}) => {
  const initialStatus = React.useMemo(
    () => status,
    // No need to update, we want the status constant for the component lifecycle.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );
  return (
    <ToggleButtonGroup
      exclusive
      value={status}
      onChange={(_, v) => v && onChange(v)}
      size="small"
      sx={sx}
    >
      {todoButtons.map(({status: s, label}) => (
        <ToggleButton key={s} value={s} disabled={!canMoveToStatus(initialStatus, s)}>
          <TodoIcon status={s} withColor={false}/> {label}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
}
