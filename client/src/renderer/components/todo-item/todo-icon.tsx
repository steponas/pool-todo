import React from 'react';
import HourglassEmptyOutlinedIcon from '@mui/icons-material/HourglassEmptyOutlined';
import PlayCircleFilledWhiteOutlinedIcon from '@mui/icons-material/PlayCircleFilledWhiteOutlined';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import {TodoStatus} from "../../../../../types";

interface Props {
  status: TodoStatus;
}

export const TodoIcon: React.FC<Props> = ({status}) => {
  switch(status) {
    case TodoStatus.TODO:
      return <HourglassEmptyOutlinedIcon />;
    case TodoStatus.ONGOING:
      return <PlayCircleFilledWhiteOutlinedIcon />;
    case TodoStatus.DONE:
      return <CheckCircleOutlineOutlinedIcon />;
    default:
      return <span>Unknown status: {status}</span>;
  }
}
