import winston, { format } from 'winston';

export const logger = winston.createLogger({
  level: 'info',
  format: format.combine(
    format.errors(),
    format.splat(),
    format.cli(),
    // format.json(),
  ),
  transports: [new winston.transports.Console()],
});
