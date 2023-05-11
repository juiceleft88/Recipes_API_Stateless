//This file serves as the logic to the custom module, recipe_api

//using superagent to make http connections
const superagent = require('superagent');

//creating a shorthand of the base URL to use i nthe functions and not have to retype
const base = 'https://www.themealdb.com/api/json';


//functions to get individual recipe from the API by the recipe ID
const getRecipe = async (recipeId) => {
    try {
        const recipeURL = `${base}/v1/1/lookup.php?i=${recipeId}`;
        const resRecipe = await superagent.get(recipeURL);
        const recipe = resRecipe.body.meals;
        return recipe;
    
    } catch (error) {
        console.log(error);
    }
};

//functions to get recipe category from the API by specifying a recipe category as a string
const getCategory = async (category) => {
    try {
        const categoryURL = `${base}/v1/1/filter.php?c=${category}`;
        
        const res = await superagent.get(categoryURL);

        return res.body;
    
    } catch (error) {
        console.log(error);
    }
};

module.exports = {
    //same as getRecipe : getRecipe
    getCategory, getRecipe
};

