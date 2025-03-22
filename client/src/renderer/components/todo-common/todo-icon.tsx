import React from 'react';
import HourglassEmptyOutlinedIcon from '@mui/icons-material/HourglassEmptyOutlined';
import PlayCircleFilledWhiteOutlinedIcon from '@mui/icons-material/PlayCircleFilledWhiteOutlined';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import {grey, blue, green} from '@mui/material/colors';
import {TodoStatus} from '../../../../../types';

interface Props {
  status: TodoStatus;
  withColor?: boolean;
}

const getIconColor = (status: TodoStatus) => {
  switch (status) {
    case TodoStatus.TODO:
      return grey['500'];
    case TodoStatus.ONGOING:
      return blue.A400;
    case TodoStatus.DONE:
      return green.A700;
    default:
      return 'red';
  }
}

export const TodoIcon: React.FC<Props> = ({status, withColor = true}) => {
  const sx = withColor ? {color: getIconColor(status)} : undefined;
  switch (status) {
    case TodoStatus.TODO:
      return <HourglassEmptyOutlinedIcon sx={sx}/>;
    case TodoStatus.ONGOING:
      return <PlayCircleFilledWhiteOutlinedIcon sx={sx}/>;
    case TodoStatus.DONE:
      return <CheckCircleOutlineOutlinedIcon sx={sx}/>;
    default:
      return <span>Unknown status: {status}</span>;
  }
}
