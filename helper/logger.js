const { createLogger, format, transports } = require('winston');

var options = {
  file: {
    filename: 'logs/combined.log',
    handleExceptions: true,
    json: true,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
    colorize: false,
    timestamp: true,
    format: format.combine(
      format.timestamp({
        format: 'DD-MM-YYYYTHH:MM:SS', // Optional for choosing your own timestamp format.
      }),
      format.json(),
    ),
  },
  error: {
    level: 'error',
    filename: 'logs/error.log',
    handleExceptions: true,
    json: true,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
    colorize: true,
    format: format.combine(
      format.timestamp({
        format: 'DD-MM-YYYYTHH:MM:SS', // Optional for choosing your own timestamp format.
      }),
      format.json(),
    ),
  },
  console: {
    level: 'debug',
    handleExceptions: true,
    json: false,
    colorize: true,
    timestamp: true,
    format: format.combine(
      format.timestamp({
        format: 'DD-MM-YYYYTHH:MM:SS', // Optional for choosing your own timestamp format.
      }),
      format.json(),
    ),
  },
};

var logger = createLogger({
  transports: [
    new transports.File(options.file),
    new transports.File(options.error),
    new transports.Console(options.console),
  ],
  exitOnError: false, // do not exit on handled exceptions
});


module.exports = logger;
