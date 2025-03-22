import {ipcMain as ipcMainImport} from 'electron/main';
import Log from 'electron-log/main';
import {IPCRendererMessageType} from '../../../../types';
import {readSettings} from './settings';

export const setupIPC = (ipcMain: typeof ipcMainImport) => {
  Log.info('Setting up IPC');

  ipcMain.handle(IPCRendererMessageType.GET_SETTINGS, readSettings);

  Log.info('IPC Setup complete');
};
