import {User} from './user';

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
