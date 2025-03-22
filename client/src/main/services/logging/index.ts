import { app } from 'electron';
import Log from 'electron-log/main';

interface Args {
  logsPath: string;
}

export const setupLogger = ({logsPath}: Args) => {
  if (!app.isPackaged) {
    // Don't log to file in development
    Log.transports.file.level = false;
    Log.transports.console.level = 'silly';
  } else {
    Log.transports.file.resolvePathFn = () => logsPath;
  }
}
