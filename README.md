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


### server.js
Contains the logic for the server, such as adding in routes, database connection, and starting the server. Specifies the local port, and creates instance of Express for working with the server.  

### package.json
Contains all the details about the application, including version number, name of the author, and the dependecies used. For this application, the dependencies I used were: `express`, `mongo`, `prompts`, `recipe_api` and `nodemon` (dev dependency).
  
