import {User} from './user';
import {TodoList} from './todo-list';

export enum WSClientRequestTypes {
  CREATE_USER = 'CREATE_USER',
  TOKEN_AUTH = 'TOKEN_AUTH',
  SELECT_LIST = 'SELECT_LIST',
  CREATE_LIST = 'CREATE_LIST',
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
