/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

// Cloud Functions for Firebase SDK to create Cloud Functions and triggers
const functions = require('firebase-functions');
const express = require('express');

const route = require('./route.js');


// init
const app = express();
app.use('/api', route)


exports.app = functions.https.onRequest(app)
