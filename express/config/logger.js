var winston = require('winston');
const path = require('path');
const rfs = require('rotating-file-stream');
const env = require('./environment');

var options = {
    console: {
        level: 'debug',
        handleExceptions: true,
        json: false,
        colorize: true
    }
};

const rfsStream = rfs.createStream(path.join('./', 'logs/log.txt'), {
    size: env.LOG_SIZE || '10M',
    interval: env.LOG_INTERVAL || '1d',
    compress: 'gzip'
});

var logger = new winston.createLogger({
    transports: [new winston.transports.File(rfsStream), new winston.transports.Console(options.console)],
    exitOnError: false // do not exit on handled exceptions
});

// create a stream object with a 'write' function that will be used by `morgan`
logger.stream = {
    write: (message, encoding) => logger.info(message)
};

global.logger = logger;
