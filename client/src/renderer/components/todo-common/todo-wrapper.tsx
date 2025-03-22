import React from 'react';
import {Card, CardContent} from '@mui/material';

interface Props {
  children: React.ReactNode;
  inEdit: boolean;
  onClick?: () => void;
}

export const TodoWrapper: React.FC<Props> = ({children, inEdit, onClick}) => {
  return (
    <Card
      variant="outlined"
      sx={{
        cursor: inEdit ? 'default' : 'pointer',
        transition: 'all 0.3s',
        '&:hover': {
          boxShadow: inEdit ? 'none' : '0 0 10px 0 rgba(0,0,0,0.1)',
        },
      }}
      onClick={onClick}
    >
      <CardContent>
        {children}
      </CardContent>
    </Card>
  )
}
