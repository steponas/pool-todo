import React from 'react';
import {Global, css} from '@emotion/react'
import Log from 'electron-log/renderer';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {Header} from '../header';
import {AppState} from './app-state';
import {ErrorBoundary} from './error-boundary';
import {User, TodoList as TodoListT} from '../../../../../types';
import {UserCreation} from '../user-creation';
import {ListSelection} from '../list-selection';
import {TodoList} from '../todo-list';
import {setupWSConnection} from '../../ws';
import {Auth} from './auth';
import {useWSDisconnect} from '../../ws/disconnect';

// Instantiate the WS Client early, before React starts rendering.
setupWSConnection();

const queryClient = new QueryClient();

export const App = () => {
  const [authenticated, setAuthenticated] = React.useState(false);
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
  }, []);

  useWSDisconnect(React.useCallback(() => {
    // WebSocket server has disconnected. Reset the authentication state.
    setAuthenticated(false);
    console.log('WebSocket disconnected, auth reset');
  }, []));

  if (user === undefined) {
    // User not yet loaded from settings. Wait to render the UI.
    return null;
  }

  let content: React.ReactNode;
  if (user === null) {
    // User is not defined. Show user creation form.
    content = (
      <UserCreation onCreated={(user, token) => {
        setUser(user);
        setToken(token);
        // Registering the user authenticates him too.
        setAuthenticated(true);
      }}/>
    );
  } else if (!authenticated) {
    content = (
      <Auth
        token={token}
        listCode={list?.code ?? null}
        onAuthenticated={() => setAuthenticated(true)}
        onReset={() => {
          setUser(null);
          setToken(null);
          setList(null);
          setAuthenticated(false);
        }}
      />
    );
  } else if (!list) {
    // Room is not selected. Need to select it first.
    content = <ListSelection onSelected={(l) => {
      setList(l);
    }}/>;
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
            html, body {
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
