const logger = require('firebase-functions/logger');


// Check if API Key in request is valid
// Using Dummy API Key here, in practice, would query query firestore with
const hasValidApiKey = async (firebaseAdmin, req) => {
    // get key in request headers
    const apiKey = req.get('API-Key');
    if (!apiKey) {
        logger.info('Unauthorized Request: No API Key.');
        return false;
    }

    // perform firestore query to check if key is valid
    const db = firebaseAdmin.firestore();
    
    const querySnapshot = await db.collection('api-keys')
        .where('api_key', '==', apiKey).get();

    const keyIsValid = !querySnapshot.empty;
    !keyIsValid && logger.info('Unauthorized Request: Provided API Key is invalid.')
    return !querySnapshot.empty;
};


module.exports = hasValidApiKey;
