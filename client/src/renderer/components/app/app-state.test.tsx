import React from 'react';
import { render, act } from '@testing-library/react';
import { AppState } from './app-state';
import {AppContext, AppContextT} from '../../context';

describe('AppState Component', () => {
  let contextValue: AppContextT;

  beforeEach(() => {
    // Test component to access context
    const TestConsumer: React.FC = () => {
      const context = React.use(AppContext);
      contextValue = context; // Capture context value for assertions
      return null; // No UI needed
    };

    render(
      <AppState>
        <TestConsumer />
      </AppState>
    );
  });

  it('updates state correctly when context functions are called', () => {
    // Initial state assertions
    expect(contextValue.isNewTodo).toBe(false);
    expect(contextValue.editedId).toBeNull();

    // Trigger onNewTodo
    act(() => contextValue.onNewTodo());
    expect(contextValue.isNewTodo).toBe(true);
    expect(contextValue.editedId).toBeNull();

    // Trigger onEdit with an ID
    act(() => contextValue.onEdit('123'));
    expect(contextValue.isNewTodo).toBe(false);
    expect(contextValue.editedId).toBe('123');

    // Trigger onCancelEdit
    act(() => contextValue.onCancelEdit());
    expect(contextValue.isNewTodo).toBe(false);
    expect(contextValue.editedId).toBeNull();
  });

  it('should reset the edited value when a new todo is created', () => {
    // Initial state assertions
    expect(contextValue.isNewTodo).toBe(false);
    expect(contextValue.editedId).toBeNull();

    // Trigger onEdit with an ID
    act(() => contextValue.onEdit('123'));
    expect(contextValue.isNewTodo).toBe(false);
    expect(contextValue.editedId).toBe('123');

    // Trigger onNewTodo
    act(() => contextValue.onNewTodo());
    expect(contextValue.isNewTodo).toBe(true);
    expect(contextValue.editedId).toBeNull();
  });
});
