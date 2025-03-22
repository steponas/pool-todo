import React from 'react';
import {AppContext} from '../../context';
import {TodoList, User} from '../../../../../types';

interface Props {
  children: React.ReactNode;
  user: User;
  list: TodoList;
}

// AppState handler.
// It provides the AppContext, with values and callbacks to operate on the state.
export const AppState: React.FC<Props> = ({children, user, list}) => {
  const [isNewTodo, setIsNewTodo] = React.useState(false);
  const [editedId, setEditedId] = React.useState<string | null>(null);
  const context = React.useMemo(() => {
    return {
      currentUser: user,
      list,
      isNewTodo,
      onNewTodo: () => {
        setIsNewTodo(true);
        setEditedId(null);
      },
      onCancelEdit: () => {
        setIsNewTodo(false);
        setEditedId(null);
      },
      editedId,
      onEdit: (id: string) => {
        setIsNewTodo(false);
        setEditedId(id);
      }
    };
  }, [isNewTodo, editedId, list, user]);
  return (
    <AppContext value={context}>
      {children}
    </AppContext>
  );
};
