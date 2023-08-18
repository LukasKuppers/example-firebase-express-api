/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

// Cloud Functions for Firebase SDK to create Cloud Functions and triggers
const admin = require('firebase-admin');
const functions = require('firebase-functions');
const logger = require('firebase-functions/logger');
const express = require('express');

const route = require('./route.js');
const hasValidApiKey = require('./apiKeyAuth.js');


// init
admin.initializeApp();
const app = express();

// api key auth
app.use(async (req, res, next) => {
    const authenticated = await hasValidApiKey(admin, req);
    if (!authenticated) {
        res.status(401).json({error: 'unauthorized'});
    } else {
        next();
    }
});

app.use('/api', route)


exports.app = functions.https.onRequest(app)
