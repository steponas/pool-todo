import {IpcMainInvokeEvent} from 'electron';
import Log from 'electron-log/main';
import {IPCStoreUserResponse, User} from '../../../../types';
import {SETTINGS_PATH} from '../config';
import {updateSettings} from '../services/settings';

export const storeUserWithToken = async (event: IpcMainInvokeEvent, user: User, token: string): Promise<IPCStoreUserResponse> => {
  Log.debug('Storing user with token');
  const err = await updateSettings(SETTINGS_PATH, s => {
    s.user = user;
    s.token = token;
  });
  const resp: IPCStoreUserResponse = {};
  if (err) {
    resp.error = err.message;
  }
  return resp;
};
