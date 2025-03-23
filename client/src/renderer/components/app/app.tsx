import React from 'react';
import {Stack} from '@mui/material';
import {Global, css} from '@emotion/react'
import Log from 'electron-log/renderer';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {Progress} from '../progress';
import {Header} from '../header';
import {AppState} from './app-state';
import {ErrorBoundary} from './error-boundary';
import {User, TodoList as TodoListT} from '../../../../../types';
import {UserCreation} from '../user-creation';
import {ListSelection} from '../list-selection';
import {TodoList} from '../todo-list';
import {setupWSConnection} from '../../ws';

const queryClient = new QueryClient();

export const App = () => {
  const [user, setUser] = React.useState<User | null | undefined>(undefined);
  const [list, setList] = React.useState<TodoListT | null>(null);
  const [token, setToken] = React.useState<string | null>(null);

  // Load the user from settings, if any.
  React.useEffect(() => {
    // Load app settings
    window.todoApi.getSettings()
      .then(s => {
        setUser(s.user ?? null);
        setList(s.list ?? null);
        setToken(s.token ?? null);
      })
      .catch(err => {
        Log.error('Failed to get app main settings', err);
        setUser(null);
      });

    // Connect to WebSocket server
    setupWSConnection();
  }, [])

  if (user === undefined) {
    // User not yet loaded from settings. Wait to render the UI.
    return null;
  }

  // TODO: Establish connection to the server
  // TODO: Token based authentication
  // TODO: Fetch TODOs from the server
  const hasData = true;

  console.log('User:', user);

  let content: React.ReactNode;
  if (user === null) {
    // User is not defined. Show user creation form.
    content = (
      <UserCreation onCreated={(user, token) => {
        setUser(user);
        setToken(token);
      }}/>
    );
  } else if (!list) {
    // Room is not selected. Need to select it first.
    content = <ListSelection onSelected={(l) => {
      setList(l);
    }}/>;
  } else if (!hasData) {
    content = (
      <Stack alignItems="center" justifyContent="center" sx={{height: '60%'}}>
        <Progress title="Loading TODOs..."/>
      </Stack>
    );
  } else {
    content = (
      <AppState user={user} list={list}>
        <Header/>
        <TodoList/>
      </AppState>
    );
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
      <ErrorBoundary>
        <QueryClientProvider client={queryClient}>
          {content}
        </QueryClientProvider>
      </ErrorBoundary>
    </>
  );
};
