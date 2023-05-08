const express = require('express');

const app = express();
const port = 8888;

const mongo = require('./db');

// start the server
app.listen(port, async () => {
    console.log(`Server is listening on port ${port}`);
    console.log('correct place');
    await mongo.connect();
});

//start the server by typing "nodemon" on command line