const logger = require('firebase-functions/logger');


const helloWorld = (req, res) => {
    const resJson = {
        message: 'Hello World!'
    };

    logger.info('Responding to request with hello world message.');
    res.json(resJson);
};

const time = (req, res) => {
    const timestamp = Date.now();

    logger.info('Responsing to request for timestamp.');
    res.json({
        timestamp: timestamp
    });
};


module.exports = {
    helloWorld, 
    time
};
