const router = require('express').Router(); //requiring express as a router to use in the routes

//requiring in needed dependencies
const database = require('../db');
const recipes = require('recipe_api');

//using this to format the recipes and only show the meal name and id
const _formatRecipes = (recipeList) => {
    return recipeList.map((rec) => {
        return {
            display: `${rec.strMeal}`, id: `${rec.idMeal}`
        };
    });
};

//endpoint for the GET /search 
router.get('/', async (req, res) => {
    try{
        const { query } = req; //destructuring to get the query from the request body
        const { category } = query; //destructuring query and assigning 'category' to it in order to use in http request "search?category="
        const recipeCategory = await recipes.getCategory(category); //calling my custom node module and passing in the category query
        
        //passing the meals array through the formatting function created above
        const results = _formatRecipes(recipeCategory.meals);

        //returning the following results with each query: the search term and the recipe results
        const queryResults = { searchTerm: category, results}; //showing the recipes in the specified category

        res.json(queryResults);

        //assigning the value of the find method results to 'exist'. If an item is not found in db, returns 'null'. If an item is found, returns array with all the entries.
        const exists = await database.find('Results', queryResults.searchTerm);

        const resultsLength = queryResults.results.length; //variable to hold the results array length in order to use in searchCount

        //just a reminder, the queryResults is not being stored in database, just the search object..so not the whole recipes list. Thats just being shown to user.
        if (exists === null){ //if the current search term not found in database, then do the following:
            const search = { //create an object with the following search values
                searchTerm : queryResults.searchTerm, //the actual search term
                searchCount : resultsLength, //the amount of times term has been searched for. Inititalizes to '1', then after this would execute the count+1 in the else block after each search
                lastSearched : new Date() //creates a timestamp for when the term was searched
            };
            database.save('Results', {...search}); //saves this first entry to the database
        } else {
            database.update('Results', queryResults.searchTerm, { //if search term is already stored in database, run the 'update' function for the following changes:
                searchCount: resultsLength, //update the searchcount by 1 each time time a repeated term in searched
                lastSearched: new Date() //update to a new timestamp
            });
        }

    } catch (error) {
        res.status(500).json(error.toString());
    }
});

//Endpoint for the GET/search/:id/details  ---> for use with a dynamic id that can be changed based on the API results
router.get('/:id/details', async (req, res) => {
    try{

        //destructuring the request
        const { query, params } = req;
        const { id } = params; //getting the id from the params in req
        const { category } = query; //getting the category from the query in the req

        const recipeDetail = await recipes.getRecipe(id); //interacting with the custom recipe_api to get the specific recipe with the id that user selected
        const queryResults = recipeDetail; //assigning the recipeDetail to queryResults. this step can be ommited, but preferred to do it this way
        const queryCategory = queryResults[0].strCategory; //getting the category name from the recipe body
       
        //checking to see if the category exists in our database, and if so returning that entry
        const exists = await database.find('Results', queryCategory);

        //if the key 'selections' does not exist in the searchTerm entry, then add it as an array of
        //objects, with the first entry being the current specific searched recipeId. Creates the fields
        //by accessing the exists object, then pushing the new object key/value pair to the selections
        //array as it's value. 
        if('selections' in exists === false){
            exists.selections = [{
                id : queryResults[0].idMeal,
                display: queryResults[0].strMeal //this can be changed to just show all recipe info by using queryResults[0]
            }]; 
            exists.selections.push;
            database.update('Results', queryCategory, {...exists}); //updates the seacrhTerm entry with the new information

            //if the 'selections' key does exist in the searchTerm entry already, then we will simply create
            //a new object with the same 'id' and 'display' attributes, then push this object to the already created 
            //'selections' array. Then we update the database with this new information.
        } else if('selections' in exists === true) {
            const selection = {
                id : queryResults[0].idMeal,
                display: queryResults[0].strMeal
            }; 
            exists.selections.push(selection); 
            database.update('Results', queryCategory, {...exists});
        }

        res.json(queryResults); //outputting the recipe information to the browser


    } catch (error) {
        res.status(500).json(error.toString());
    }
});

module.exports = router;