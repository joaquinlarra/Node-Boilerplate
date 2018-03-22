const bunyan = require('bunyan');
const { environmentConfig } = require('../../config');
const path = require('path');

class Logger {

    constructor() {
        this.name = "nodejs";
    }

    create() {
        let root = path.dirname(require.main.filename);
        
        return new bunyan.createLogger({
            name: this.name,
            streams: [
                {
                    type: 'rotating-file',
                    path:  path.join(root + '/log/general.log'),
                    period: '1d',   // daily rotation
                    count: 3        // keep 3 back copies
                },
                {
                    level: 'info',
                    stream: process.stderr,
                },
                {
                    level: 'debug',
                    stream: process.stderr,
                },
                {
                    level: 'error',
                    path:  path.join(root + '/log/error.log'),
                },
            ]
        });
    }
}

module.exports = Logger;