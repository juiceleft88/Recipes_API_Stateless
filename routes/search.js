const router = require('express').Router();

const db = require('../db');
const recipes = require('recipe_api');

router.get('/', async (req, res) => {
    try{
        console.log('This is in the / endpoint for search.js');
    } catch (error) {
        res.status(500).json(error.toString());
    }
});

module.exports = router;