const router = require('express').Router();

const database = require('../db');

/**
 * @api {GET} /results              get all recipes from database
 * @apiExample                      localhost:8888/results
 */
router.get('/', async (req, res) => {
    try {
        const { query } = req;
        const { category } = query;

        //finding the results for both all the findings in db, and for the specific case  using query of category
        const exists = await database.find('Results', category);
        const results = await database.find('Results');

        //if there was a match found in the database with the query, then 'exists' has found it, and so will output that history
        if(exists !== null){
            res.json(exists);
        //if no match was found (meaning exists found nothing and so is null), then just display all history in the db
        } else if(exists === null){
            res.json(results);
        }

    } catch (error) {
        res.status(500).json(error.toString());
    }
});

module.exports = router;
