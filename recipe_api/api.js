//This file serves as the logic to our custom module, recipe_api


const superagent = require('superagent');

const base = 'https://www.themealdb.com/api/json';
//www.themealdb.com/api/json/v1/1/search.php?s=Arrabiata
//www.themealdb.com/api/json/v1/1/lookup.php?i



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

const getCategory = async (category) => {
    try {
        const categoryURL = `${base}/v1/1/filter.php?c=${category}`;
        
        const res = await superagent.get(categoryURL);
        //console.log(res.body);
        return res.body;
    
    } catch (error) {
        console.log(error);
    }
};

module.exports = {
    //same as getRecipe : getRecipe
    getCategory, getRecipe
};

