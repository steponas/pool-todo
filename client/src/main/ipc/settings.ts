import {loadSettings} from '../services/settings';
import {SETTINGS_PATH} from '../config';
import {IPCGetSettingsResponse} from '../../../../types';

export const readSettings = async (): Promise<IPCGetSettingsResponse> => {
  const result = await loadSettings(SETTINGS_PATH);
  return {
    user: result.settings.user,
    list: result.settings.list,
    token: result.settings.token,
    error: result.error,
  };
};
