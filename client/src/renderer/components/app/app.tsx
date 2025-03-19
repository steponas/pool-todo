import React from 'react';
import {Stack} from '@mui/material';
import {Global, css} from '@emotion/react'
import {Progress} from '../progress';
import {TodoList} from '../todo-list';

export const App = () => {
  // TODO: Establish connection to the server
  // TODO: Token based authentication
  // TODO: Fetch TODOs from the server
  const hasData = true;
  // const error = null;

  let content: React.ReactNode;
  if (!hasData) {
    content = (
      <Stack alignItems="center" justifyContent="center" sx={{height: '60%'}}>
        <Progress title="Loading TODOs..."/>
      </Stack>
    );
  } else {
    content = <TodoList/>;
  }
  return (
    <>
      <Global
        styles={css`
            document, html, body {
                margin: 0;
                padding: 0;
                height: 100%;
            }
        `}
      />
      {content}
    </>
  );
};
