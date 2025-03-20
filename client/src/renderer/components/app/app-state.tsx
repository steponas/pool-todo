import React from 'react';
import {AppContext} from '../../context';

interface Props {
  children: React.ReactNode;
}

// AppState handler.
// It provides the AppContext, with values and callbacks to operate on the state.
export const AppState: React.FC<Props> = ({children}) => {
  const [isNewTodo, setIsNewTodo] = React.useState(false);
  const [editedId, setEditedId] = React.useState<string | null>(null);
  const context = React.useMemo(() => {
    return {
      currentUser: {id: '1', name: 'John Doe'},
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
  }, [isNewTodo, editedId]);
  return (
    <AppContext value={context}>
      {children}
    </AppContext>
  );
};
