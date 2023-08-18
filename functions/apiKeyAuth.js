const logger = require('firebase-functions/logger');

const admin = require('./admin.js');


// Check if API Key in request is valid
// Using Dummy API Key here, in practice, would query query firestore with
const hasValidApiKey = async (req) => {
    // get key in request headers
    const apiKey = req.get('API-Key');
    if (!apiKey) {
        logger.info('Unauthorized Request: No API Key.');
        return false;
    }

    // perform firestore query to check if key is valid
    const db = admin.firestore();
    let querySnapshot;
    
    try {
        querySnapshot = await db.collection('api-keys')
            .where('api_key', '==', apiKey).get();
    } catch (error) {
        logger.error('HasValidAPIKey: Error when querying for API Key:', error);
        throw error;
    }

    const keyIsValid = !querySnapshot.empty;
    !keyIsValid && logger.info('Unauthorized Request: Provided API Key is invalid.')
    return !querySnapshot.empty;
};


module.exports = hasValidApiKey;
