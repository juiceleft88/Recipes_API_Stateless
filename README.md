# Recipes_API_Stateless
A stateless server using Javascript and Node.js to interact with a meal recipes API called TheMealDB.

 ## Summary
In this program, I am evolving a previous command-line-interface program that worked with an API called TheMealDB to allow for browsing and selecting recipes through the command line, into a Stateless Express.js Server Application. To do this, I have employed my knowledge of Node.js servers including routing, Node Modules, and Database integration through MongoDB. My Server Application makes use of a custom node module that I created from the logic of my previous CLI program, in order to interact with TheMealDB API, and also connects to Mongo Atlas Cloud Database to store data.

### Technologies used to test and run:
- **Postman** - to help in visualizing my endpoint logic and responses, as well as header data

- **MongoDB** - To store the search history objects, and retrieve them (to show in browser in /history endpoint)

- **Nodemon** - Command line tool which monitors project directory and automatically restarts the node application when it detects any changes. Major time-saver to keep server running after changes in program.  

## Parts of my program:

### recipes_api
A custom Node Module I created for interacting with the meal database (TheMealDB) API. I used superagent to make the direct HTTP call to the API. This module contains:
  `package.json` - Details the info about the module, as well as the dependencies
  `api.js` - contains two functions which are exported by the module: one allows for searching the API by recipe category, and returning an array that represents the results list, and one for getting details by a specific meal id, which returns only the information for that particular recipe.
  
### db
Contains the logic for working with my database:
  `index.js` - contains the logic needed to connect to the Mongo Atlas Cloud Database, as well as functions that allow for basic CRUD operations. I call the `config.json` file in the `connect` function in order to keep my login credentials neatly in a separate file (which I am not publishing in this repo).
  
### routes
 **`history.js`** - route for the `GET /history` endpoint, which contains the logic for retrieving the history of searches from the database. This endpoint accepts an optional query parameter for finding history by meal category search term (ie. 'Beef', 'Chicken'..). If a query parameter is provided, then this endpoint returns a JSON response of the history associated to the search term in the Atlas Cloud Mongo database. If NO query parameter is provided, then it returns a JSON response of **all** the history saved in the database. 
 
**`search.js`** - route for the `GET /search` and `GET /search/:id/details` endpoints, which contains the logic for both searching the API by meal category, then getting an individual recipe by unique id. 
 
- **`GET /search`** - Endpoint which accepts a query parameter that is the category of recipes for which to search. This endpoint performs two tasks: gets the search results and responds with JSON, and creates the search history object in MongoDB. I make us of my custom `recipe_api` module here to search by recipe category. The JSON response of the endpoint includes the search term (the recipe category), and the results array containing all the recipes. I use a formatting function to map only the unique recipe `id` and meal title (`display`) attributes of the recipe body to the results array, in order to keep the results clean and easy to navigate. I make use of the Mongo database to store the search history in the following way: if the search term (recipe category) does not exist already in the database, then I create a new document to be saved in the Mongo DB history collection with fields of `searchTerm`, `searchCount` (number of search results returned), and `lastSearched` (time the category was last searched). But if the search term does exist in the database already, I simply update the document with a new timestamp date for the `lastSearched` value.
 
- **`GET /search/:id/details`** - Endpoint where `id` is the unique dynamic identifier corresponding to the user's recipe selection (in the form of the actual recipe id). This endpoint accepts a query parameter, the associated recipe category that was searched for previously when choosing a specific recipe, and performs two main tasks: Gets the recipe details by id and responds in JSON with those details, and updates the search history object in MongoDB. I make use of my custom 'recipe_api' module here again to search the API by recipe id, and the endpoint responds with the details of the searched recipe in JSON. I then use the search term (recipe category), to find and update the document on MongoDB with the user’s selection. If there is no `selections` key on the saved document (meaning it’s the first time searching a specific recipe), then I add it as an array with the first object being `{ id, display}’, where display is the meal name (not the whole recipe body). If there is already a `selections` key present, then I just update the array by adding a new object of `{ id, display }`. I do not take uniqueness of search into account, I simply add all queries to the array. The rest of the fields in the document stay as is (so `searchCount` and `lastSearched` are not updated in any way here).

### server.js
Contains the logic for the server, such as adding in routes, database connection, and starting the server. Specifies the local port, and creates instance of Express for working with the server.  

### package.json
Contains all the details about the application, including version number, name of the author, and the dependecies used. For this application, the dependencies I used were: `express`, `mongo`, `prompts`, `recipe_api` and `nodemon` (dev dependency).
  
