const express = require('express'); //requiring in the express module

const app = express(); //creating an instance of the express router, and assigning it to 'app'
const port = 8888; //specifying the port

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
    await mongo.connect(); //making the connection to db
});

//start the server by typing "nodemon" on command line