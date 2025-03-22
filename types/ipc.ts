import {User} from './user';
import {LoadSettingsError} from './settings';
import {TodoList} from './todo-list';

export enum IPCRendererMessageType {
  GET_SETTINGS = 'GET_SETTINGS',
}

export enum IPCMainMessageType {
}

export interface IPCGetSettingsResponse {
  user?: User;
  list?: TodoList;
  token?: string;
  error?: LoadSettingsError;
}
