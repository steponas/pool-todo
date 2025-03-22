import {contextBridge, ipcRenderer} from 'electron';
import {IPCGetSettingsResponse, IPCRendererMessageType} from '../../../types';

const todoApi = {
  getSettings: (): Promise<IPCGetSettingsResponse> => ipcRenderer.invoke(IPCRendererMessageType.GET_SETTINGS),
};

declare global {
  interface Window {
    todoApi: typeof todoApi;
  }
}

contextBridge.exposeInMainWorld('todoApi', todoApi);
