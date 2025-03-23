import {User} from './user';
import {TodoList} from './todo-list';
import {Todo} from './todo';

export enum WSClientRequestTypes {
  CREATE_USER = 'CREATE_USER',
  TOKEN_AUTH = 'TOKEN_AUTH',
  SELECT_LIST = 'SELECT_LIST',
  CREATE_LIST = 'CREATE_LIST',
  VALIDATE_LIST_EXISTS = 'VALIDATE_LIST_EXISTS',
  GET_LIST_TODOS = 'GET_LIST_TODOS',
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
}

export interface WSAuthenticateResponse {
  user: User;
}

export interface WSListCreatedResponse {
  list: TodoList;
}

export interface WSTodoListExistsRequest {
  code: string;
}

export interface WSTodoListExistsResponse {
  exists: boolean;
}

export interface WSGetListTodosRequest {
  code: string;
}

export interface WSGetListTodosResponse {
  todos: Todo[];
}
