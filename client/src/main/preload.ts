import {contextBridge, ipcRenderer} from 'electron';
import {IPCGetSettingsResponse, IPCRendererMessageType, IPCStoreUserResponse, User} from '../../../types';

const todoApi = {
  getSettings: (): Promise<IPCGetSettingsResponse> => ipcRenderer.invoke(IPCRendererMessageType.GET_SETTINGS),
  storeUserData: (u: User, token: string): Promise<IPCStoreUserResponse> =>
    ipcRenderer.invoke(IPCRendererMessageType.STORE_USER, u, token),
};

declare global {
  interface Window {
    todoApi: typeof todoApi;
  }
}

contextBridge.exposeInMainWorld('todoApi', todoApi);
