const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();

const axios = require('axios');
const express = require('express');
const cors = require('cors');
const app = express();
const { config } = require("./config")

const VERSION = "0.0.1";
const API_KEY_NAME = "x-api-key"

const isApiKeyValid = (request,keyName,apiKeys) => {
    const apiKey = request.header(keyName);
    return (apiKey != undefined && apiKey != null && apiKey.length > 0) ? apiKeys.includes(apiKey) : false;
}

// Automatically allow cross-origin requests
app.use(cors({ origin: true }));

app.get('/version', (request, response) => {
    response.send(VERSION);
})

app.get('/version-secured', (request, response) => {
  if(isApiKeyValid(request,API_KEY_NAME,config.apiKeys)) {
    response.status(200).send(VERSION);
  } else {
    response.status(401).send('unauthorized');
  }
})

// Expose Express API as a single Cloud Function:
exports.hsax = functions.https.onRequest(app);





