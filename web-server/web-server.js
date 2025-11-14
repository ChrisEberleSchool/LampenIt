/**
 * 
 * This file is the node js server run by each defined instance 
 * in docker. 
 */

const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

/** 
 * The environment var defined inside of docker-compose.yaml.
 * This allows docker to rune all the instances of servers in the 
 * docker-compose.yaml file.
*/
const replicaApp = process.env.APP_NAME

app.use(express.static(path.join(__dirname, 'www')));

app.use('/images', express.static(path.join(__dirname, 'images')));

// Hide Express fingerprint
app.disable('x-powered-by');

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'www', 'index.html'));
    console.log(`Request served by ${replicaApp}`);
});

app.listen(port, () => {
    console.log(`node app is listening on port ${port}`);
});