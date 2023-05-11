const express = require('express');

const app = express();
const port = 8888;

const mongo = require('./db');

// require in the exported router from search.js
const search = require('./routes/search.js');
app.use('/search', search);

//require in the exported router from history.js
const history = require('./routes/history.js');
app.use('/history', history);

// start the server
app.listen(port, async () => {
    console.log(`Server is listening on port ${port}`);
    console.log('correct place');
    await mongo.connect();
});

//start the server by typing "nodemon" on command line