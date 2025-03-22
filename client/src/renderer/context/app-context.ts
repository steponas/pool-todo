import React from 'react';
import {TodoList, User} from '../../../../types';

export interface AppContextT {
  // User data
  currentUser: User;
  list: TodoList;
  // Newly added TODO data
  isNewTodo: boolean;
  onNewTodo: () => void;
  // Edit state
  onCancelEdit: () => void;
  editedId: string | null;
  onEdit: (id: string) => void;
}

export const AppContext = React.createContext<AppContextT | null>(null);

export const useAppContext = (): AppContextT => {
  const ctx = React.use(AppContext);
  if (!ctx) {
    throw new Error('AppContext not found');
  }
  return ctx;
};
