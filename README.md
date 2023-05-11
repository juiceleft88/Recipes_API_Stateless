# Recipes_API_Stateless
A stateless server using Javascript and Node.js to interact with a meal recipes API.

 ## Summary
In this program, I am evolving a previous command-line-interface program that worked with an API called TheMealDB to allow for browsing and selecting recipes through the command line, into a Stateless Express.js Server Application. To do this, I have employed my knowledge of Node.js servers including routing, Node Modules, and Database integration through MongoDB. My Server Application makes use of a custom node module that I created from the logic of my previous CLI program, in order to interact with TheMealDB API, and also connects to Mongo Atlas Cloud Database to store data.

## Parts of my program:

### recipes_api
A custom Node Module I created for interacting with the meal database (TheMealDB) API. I used superagent to make the direct HTTP call to the API. This module contains:
  `package.json` - Details the info about the module, as well as the dependencies
  `api.js` - contains two functions which are exported by the module: one allows for searching the API by recipe category, and returning an array that represents the results list, and one for getting details by a specific meal id, which returns only the information for that particular recipe.
  
### db
Contains the logic for working with my database:
  `index.js` - contains the logic needed to connect to the Mongo Atlas Cloud Database, as well as functions that allow for basic CRUD operations. I call the `config.json` file in the `connect` function in order to keep my login credentials neatly in a separate file (which I am not publishing in this repo).
  
### routes
 `history.js` - route for the `GET /history` endpoint, which contains the logic for retrieving the history of searches from the database. This endpoint accepts an optional query parameter for finding history by meal category search term (ie. 'Beef', 'Chicken'..). If a query parameter is provided, then this endpoint returns a JSON response of the history associated to the search term in the Atlas Cloud Mongo database. If NO query parameter is provided, then it returns a JSON response of **all** the history saved in the database. 
 `search.js` - route for the `GET /search` and `GET /search/:id/details` endpoints, which contains the logic for both searching the API by meal category, then getting an individual recipe by unique id. 
   -`GET /search` - Endpoint which accepts a query parameter that is the category of recipes for which to search. This endpoint performs two tasks: gets the search results and responds with JSON, and creates the search history object in MongoDB. I make us of my custome `recipe_api` module here to search by recipe category. The JSON response of the endpoint includes the search term (the recipe category), and the results array containing all the recipes. I use a formatting function to map only the unique recipe `id` and meal title (`display`) attributes of the recipe body to the results array, in order to keep the results clean and easy to navigate. I make use of the Mongo database to store the search history in the following way: if the search term (recipe category) does not exist already in the database, then I create a new document to be saved in the Mongo DB history collection with fields of `searchTerm`, `searchCount` (number of search results returned), and `lastSearched` (time the category was last searched). But if the search term does exist in the database already, I simply update the document with a new timestamp date for the `lastSearched` value.
   -`GET /search/:id/details` - 

### server.js
Contains the logic for the server, such as adding in routes, database connection, and starting the server. Specifies the local port, and creates instance of Express for working with the server.  

### package.json
Contains all the details about the application, including version number, name of the author, and the dependecies used. For this application, the dependencies I used were: `express`, `mongo`, `prompts`, `recipe_api` and `nodemon` (dev dependency).
  
