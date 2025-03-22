import {app} from 'electron';
import * as path from 'node:path';

const SETTINGS_FILE = 'settings.json';
export const SETTINGS_PATH = path.join(app.getPath('userData'), SETTINGS_FILE);

const LOGS_FILE = 'todo.log';
export const LOGS_PATH = path.join(app.getPath('userData'), LOGS_FILE);
