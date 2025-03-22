import fs from 'node:fs/promises';
import Log from 'electron-log/main';
import {LoadSettingsError, TodoList, User} from '../../../../../types';

export interface Settings {
  user?: User;
  list?: TodoList;
  token?: string;
}

interface LoadSettingsResult {
  settings: Settings;
  error?: LoadSettingsError;
}

let cachedResult: LoadSettingsResult | null = null;

export const clearCachedSettings = () => {
  cachedResult = null;
}

const loadSettingsFromFs = async (path: string) => {
  let data: string;
  try {
    data = await fs.readFile(path, 'utf-8');
  } catch (err) {
    Log.warn('Failed to load settings file', err);
    return {
      settings: {},
      error: LoadSettingsError.FILE_NOT_FOUND,
    };
  }

  let settings: Settings;
  try {
    settings = JSON.parse(data);
  } catch (err) {
    Log.error('Failed to parse settings file content', err);
    return {
      settings: {},
      error: LoadSettingsError.INVALID_JSON,
    };
  }

  // Some simple validation to ensure the settings file is in the correct format
  if (!settings || typeof settings !== 'object' || Array.isArray(settings)) {
    Log.error('Settings file is not an object', {data});
    return {
      settings: {},
      error: LoadSettingsError.INVALID_FORMAT,
    };
  }
  return {
    settings,
  };
}

export const loadSettings = async (path: string) => {
  if (!cachedResult) {
    cachedResult = await loadSettingsFromFs(path);
  }
  return cachedResult;
};

export const writeSettings = async (path: string, settings: Settings) => {
  try {
    await fs.writeFile(path, JSON.stringify(settings, null, 2), 'utf-8');
  } catch (err) {
    Log.error('Failed to write settings file', err);
    return false;
  }
  return true;
}
