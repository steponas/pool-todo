import {User} from './user';
import {TodoList} from './todo-list';
import {Todo} from './todo';

export enum WSClientRequestTypes {
  CREATE_USER = 'CREATE_USER',
  TOKEN_AUTH = 'TOKEN_AUTH',
  SELECT_LIST = 'SELECT_LIST',
  CREATE_LIST = 'CREATE_LIST',
  GET_LIST_TODOS = 'GET_LIST_TODOS',
  CREATE_TODO = 'CREATE_TODO',
}

export interface WSErrorResponse {
  error: string;
}

export interface WSCreateUserRequest {
  name: string;
}

export interface WSCreateUserResponse {
  user: User;
  token: string;
}

export interface WSAuthenticateRequest {
  token: string;
  listCode?: string | null;
}

export interface WSAuthenticateResponse {
  user: User;
}

export interface WSListCreatedResponse {
  list: TodoList;
}

export interface WSSelectTodoListRequest {
  code: string;
}
export interface WSSelectTodoListResponse {}

export interface WSGetListTodosResponse {
  todos: Todo[];
}

export interface WSCreateTodoItemRequest {
  title: string;
}
export interface WSCreateTodoItemResponse {
  todo: Todo;
}
