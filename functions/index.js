const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();

const axios = require('axios');
const express = require('express');
const cors = require('cors');
const app = express();
const { config } = require("./config")

const VERSION = "0.0.3";
const API_KEY_NAME = "x-api-key"

function isApiKeyValid(req,keyName,apiKeys) {
  const apiKey = req.header(keyName);
  return (apiKey != undefined && apiKey != null && apiKey.length > 0) 
            ? apiKeys.includes(apiKey) : false;
}

// Automatically allow cross-origin requests
app.use(cors({ origin: true }));

app.get('/version', (req, res) => {res.send(VERSION)})
app.get('/version-secured', (req, res) => {
  if(isApiKeyValid(req,API_KEY_NAME,config.apiKeys))
    res.status(200).send(VERSION)
  else 
    res.status(401).send('unauthorized');
})

app.get('/publications', (req, res) => {
  if(isApiKeyValid(req,API_KEY_NAME,config.apiKeys)) {
    res.contentType("application/json");
    const { publications } = require("./data/publications/index.js")
    publications(req, res);
  } else {
    res.status(401).send('unauthorized');
  }
})

app.get('/publications/:publication', (req, res) => {
  if(isApiKeyValid(req,API_KEY_NAME,config.apiKeys)) {
    res.contentType("application/json");
    const { publication } = require(`./data/publications/${req.params.publication}/index.js`)
    publication(req, res);
  } else {
    res.status(401).send('unauthorized');
  }
})

// Expose Express API as a single Cloud Function:
exports.hsax = functions.https.onRequest(app);
