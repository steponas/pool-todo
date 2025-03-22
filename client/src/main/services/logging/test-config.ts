import mainLog from 'electron-log/main';

// Do not log in test mode
mainLog.transports.file.level = false;
mainLog.transports.console.level = false;
