import {IpcMainInvokeEvent} from 'electron';
import Log from 'electron-log/main';
import {IPCStoreTodoListResponse, TodoList} from '../../../../types';
import {updateSettings} from '../services/settings';
import {SETTINGS_PATH} from '../config';

export const storeList = async (event: IpcMainInvokeEvent, list: TodoList): Promise<IPCStoreTodoListResponse> => {
  Log.debug('Storing user\'s todo list');
  const resp: IPCStoreTodoListResponse = {};
  const err = await updateSettings(SETTINGS_PATH, s => {
    s.list = list;
  });
  if (err) {
    resp.error = err.message;
  }
  return resp;
};
