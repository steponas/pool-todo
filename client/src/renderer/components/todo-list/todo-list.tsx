import React from 'react';
import {Stack} from '@mui/material';
import {TodoUpdate, TodoUpdateStatus} from '../../../../../types';
import {TodoItem, NewTodoItem} from '../todo-item';
import {Empty} from './empty';
import {useAppContext} from '../../context';
import {TodoEdit} from '../todo-edit';
import {useTodoStore} from './todo-store';
import {Progress} from '../progress';
import {QueryError} from '../common/query-error';
import {useUpdateTodoMutation} from '../../ws/update-todo-item';
import {TodoConflict} from './conflict';
import {useDeleteTodoMutation} from '../../ws/delete-todo-item';

export const TodoList = () => {
  const ctx = useAppContext();
  const {todoList, isPending, error} = useTodoStore();
  const {mutate: update, isPending: isUpdating, error: updateError, reset: resetUpdate} = useUpdateTodoMutation();
  const [conflictData, setConflictData] = React.useState<TodoUpdate | null>(null);
  const {mutate: deleteTodo, isPending: isDeleting, error: deletionError, reset: resetDelete} = useDeleteTodoMutation();

  const saveTodo = (id: string, lastUpdateTime: string, u: TodoUpdate) => {
    update({
      id,
      lastUpdateTime,
      status: u.status,
      title: u.title,
    }, {
      onSuccess: (res) => {
        switch (res.status) {
          case TodoUpdateStatus.OK:
            // Update done. Close the edit mode.
            closeEditing();
            break;
          case TodoUpdateStatus.CONFLICT:
            // Conflict. Show the error.
            setConflictData(u);
            break;
          case TodoUpdateStatus.INCORRECT_STATUS:
            // Incorrect status. Show the error.
            break;
        }
      },
    })
  }

  const closeEditing = () => {
    ctx.onCancelEdit();
    setConflictData(null);
    // Reset query states
    resetUpdate();
    resetDelete();
  }

  if (isPending) {
    return (
      <Stack alignItems="center" justifyContent="center" sx={{height: '60%'}}>
        <Progress title="Loading TODOs..."/>
      </Stack>
    );
  }
  if (error) {
    return (
      <Stack alignItems="center" justifyContent="center" sx={{height: '60%'}}>
        <QueryError title="Failed to load TODOs" error={error}/>
      </Stack>
    );
  }

  const items = todoList?.map((todo) => {
    if (todo.id === ctx.editedId) {
      // For edit, show the edit component
      return (
        <TodoEdit
          key={todo.id}
          initialTitle={todo.title}
          initialStatus={todo.status}
          onSave={(todoUpdate: TodoUpdate) => saveTodo(todo.id, todo.updatedAt, todoUpdate)}
          onDelete={() => {
            deleteTodo({id: todo.id}, {
              onSuccess: closeEditing,
            });
          }}
          onCancel={closeEditing}
          error={updateError || deletionError}
          isLoading={isUpdating || isDeleting}
        />
      )
    }
    return (
      <TodoItem
        key={todo.id}
        todo={todo}
        onStartEdit={() => ctx.onEdit(todo.id)}
      />
    )
  });
  if (ctx.isNewTodo) {
    items.unshift(<NewTodoItem key="new-todo"/>);
  }

  let content;
  if (items?.length === 0) {
    content = <Empty/>;
  } else {
    content = <>{items}</>;
  }

  return (
    <Stack spacing={2} sx={{p: 3}}>
      {content}
      {conflictData && ctx.editedId && (
        <TodoConflict
          onCancel={closeEditing}
          onOverride={() => {
            // User has confirmed the override, save the TODO with current time
            saveTodo(ctx.editedId, new Date().toISOString(), conflictData)
          }}
        />
      )}
    </Stack>
  );
};
