import winston from 'winston';
const logger = winston.createLogger({
	format: winston.format.simple(),
	transports: [
    new winston.transports.File({ filename: './log/error.log', level: 'error' }),
    new winston.transports.File({ filename: './log/logger.log', level: 'info' })
  ]
});

export default logger;
