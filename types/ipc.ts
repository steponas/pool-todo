import {User} from './user';
import {LoadSettingsError} from './settings';
import {TodoList} from './todo-list';

export enum IPCRendererMessageType {
  GET_SETTINGS = 'GET_SETTINGS',
  STORE_USER = 'STORE_USER',
}

export interface IPCGetSettingsResponse {
  user?: User;
  list?: TodoList;
  token?: string;
  error?: LoadSettingsError;
}

export interface IPCStoreUserResponse {
  error?: string;
}
