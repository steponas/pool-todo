import {ipcMain as ipcMainImport} from 'electron';
import Log from 'electron-log/main';
import {IPCRendererMessageType} from '../../../../types';
import {readSettings} from './settings';
import {storeUserWithToken} from './user';

export const setupIPC = (ipcMain: typeof ipcMainImport) => {
  Log.info('Setting up IPC');

  ipcMain.handle(IPCRendererMessageType.GET_SETTINGS, readSettings);
  ipcMain.handle(IPCRendererMessageType.STORE_USER, storeUserWithToken);

  Log.info('IPC Setup complete');
};
