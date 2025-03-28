import {ipcMain as ipcMainImport} from 'electron';
import Log from 'electron-log/main';
import {IPCRendererMessageType} from '../../../../types';
import {readSettings, resetSettings} from './settings';
import {storeUserWithToken} from './user';
import {storeList} from './list';

export const setupIPC = (ipcMain: typeof ipcMainImport) => {
  Log.info('Setting up IPC');

  ipcMain.handle(IPCRendererMessageType.GET_SETTINGS, readSettings);
  ipcMain.handle(IPCRendererMessageType.STORE_USER, storeUserWithToken);
  ipcMain.handle(IPCRendererMessageType.STORE_LIST, storeList);
  ipcMain.handle(IPCRendererMessageType.RESET_SETTINGS, resetSettings);

  Log.info('IPC Setup complete');
};
