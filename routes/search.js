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

        database.findSearchTerm('Results', category);
        //database.save('Results', {...queryResults});
        
    } catch (error) {
        res.status(500).json(error.toString());
    }
});

module.exports = router;