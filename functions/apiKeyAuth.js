const logger = require('firebase-functions/logger');

const admin = require('./admin.js');


// overall function to manage api key auth
// returns true iff api key in request is valid
const authenticateAPIKey = async (req) => {
    const keyDoc = await getApiKeyDoc(req);
    if (!keyDoc || keyDoc == undefined || !isLimitValid(keyDoc)) {
        return false;
    }

    // key is valid, update requests remaining for key and proceed
    decrementRequestsRemaining(keyDoc);
    return true;
};

// get Firestore Document for API key (if key is valid)
const getApiKeyDoc = async (req) => {
    // get key in request headers
    const apiKey = req.get('API-Key');
    if (!apiKey) {
        logger.info('Unauthorized Request: No API Key.');
        return null;
    }

    // perform firestore query to check if key is valid
    const db = admin.firestore();
    let querySnapshot;
    
    try {
        querySnapshot = await db.collection('api-keys')
            .where('api_key', '==', apiKey).get();
    } catch (error) {
        logger.error('getApiKeyDoc: Error when querying for API Key:', error);
        throw error;
    }

    if (querySnapshot.empty) {
        logger.info('Unauthorized Request: Provided API Key is invalid.')
        return null
    }
    return querySnapshot.docs[0];
};

// check if limit is exceeded for key. 
const isLimitValid = (apiKeyDoc) => {
    const keyData = apiKeyDoc.data();

    logger.info('Forbidden Request: Provided API has exceeded its rate limit.')
    return keyData.requests_remaining > 0;
};

const decrementRequestsRemaining = (apiKeyDoc) => {
    const db = admin.firestore();

    try {
        const docRef = db.collection('api-keys').doc(apiKeyDoc.id)
        docRef.update({
            requests_remaining: apiKeyDoc.data().requests_remaining - 1
        });
    } catch (error) {
        logger.error('decrementRequestsRemaining: Error when updating requests_remaining:', error);
        throw error;
    }
};


module.exports = authenticateAPIKey;
