import 'dotenv/config';
import winston from 'winston';

const transports = [new winston.transports.Console()];

// Create a Winston logger that streams to Stackdriver Logging
// Logs will be written to: "projects/YOUR_PROJECT_ID/logs/winston_log"
export const logger = winston.createLogger({
  level: 'info',
  transports,
});

export default logger;
