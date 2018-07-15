const path = require('path');
const winston = require(path.join(__dirname,'../../../node_modules/winston'));
const options = {
    file: {
        level: 'info',
        filename: path.join(__dirname,'../logs/app.log'),
        handleExceptions: true,
        maxsize: 10485760, // 10MB
        maxFiles: 50,
        colorize: false,
    },
    console: {
        level: 'debug',
        handleExceptions: true,
        json: false,
        colorize: true,
    },
};

const logger = winston.createLogger({
    transports: [
        new winston.transports.File(options.file),
        new winston.transports.Console(options.console)
    ],
    exitOnError: false, // do not exit on handled exceptions
});
process.on('message', (args)=>{
    logger[args.level](args.msg)
});