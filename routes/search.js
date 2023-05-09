const router = require('express').Router();

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

router.get('/', async (req, res) => {
    try{
        const { query, params } = req; //destructuring to get the query from the request body
        //const { cat } = params;
        const { category } = query; //destructuring query and assigning 'category' to it in order to use in http request "search?category="
        const recipeCategory = await recipes.getCategory(category); //calling my custom node module and passing in the category query
        
        //passing the meals array through the formatting function created above
        const results = _formatRecipes(recipeCategory.meals);

        //returning the following results with each query: the search term and the recipe results
        const queryResults = { searchTerm: category, results}; //showing the recipes in the specified category

        res.json(queryResults);

        //assigning the value of the find method results to 'exist'. If an item is not found in db, returns 'null'. If an item is found, returns array with all the entries.
        const exists = await database.find('Results', queryResults.searchTerm);
        //console.log(exists);

        let count = 1;
        //just a reminder, the queryResults is not being stored in database, just the search object..so not the whole recipes list. Thats just being shown to user.
        if (exists === null){ //if the current search term not found in database, then do the following:
            console.log('nothing was found');
            const search = { //create an object with the following search values
                searchTerm : queryResults.searchTerm, //the actual search term
                searchCount : count, //the amount of times term has been searched for. Inititalizes to '1', then after this would execute the count+1 in the else block after each search
                lastSearched : new Date() //creates a timestamp for when the term was searched
            };
            database.save('Results', {...search}); //saves this first entry to the database

        } else {
            console.log('Search term is already in the database');
            database.update('Results', queryResults.searchTerm, { //if search term is already stored in database, run the 'update' function for the following changes:
                searchCount: count+1, //update the searchcount by 1 each time time a repeated term in searched
                lastSearched: new Date() //update to a new timestamp
            });
        }
        
    } catch (error) {
        res.status(500).json(error.toString());
    }
});

module.exports = router;