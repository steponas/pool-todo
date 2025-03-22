import {IpcMainInvokeEvent} from 'electron';
import {IPCStoreUserResponse, User} from '../../../../types';
import {SETTINGS_PATH} from '../config';
import {loadSettings, writeSettings} from '../services/settings';

export const storeUserWithToken = async (event: IpcMainInvokeEvent, user: User, token: string): Promise<IPCStoreUserResponse> => {
  const {settings} = await loadSettings(SETTINGS_PATH);
  settings.user = user;
  settings.token = token;

  const resp: IPCStoreUserResponse = {};
  const err = await writeSettings(SETTINGS_PATH, settings);
  if (err) {
    resp.error = err.message;
  }
  return resp;
};
