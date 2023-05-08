const router = require('express').Router();

const db = require('../db');
const recipes = require('recipe_api');

router.get('/', async (req, res) => {
    try{
        const { query, params } = req; //destructuring to get the query from the request body
        //const { cat } = params;
        const { category } = query; //destructuring query and assigning 'category' to it in order to use in http request "search?category="
        const recipeCategory = await recipes.getCategory(category); //calling my custom node module and passing in the category query
        
        const results = recipeCategory; //showing the recipes in the specified category

        console.log(req);
        res.json(results);
    } catch (error) {
        res.status(500).json(error.toString());
    }
});

module.exports = router;