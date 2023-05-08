const { MongoClient } = require('mongodb');

const config = require('../config.json');

const mongo = () => {
    
    const mongoURL = `mongodb+srv://${config.username}:${config.password}@recipesapp.krh7qfp.mongodb.net/${config.database_name}?retryWrites=true&w=majority`;
    let db = null;

    //connects to mongo database on atlas via url and sets up instance
    async function connect() {
        try {
            const client = new MongoClient(mongoURL);
            await client.connect();

            db = client.db();

            console.log('Connected to Mongo DB');
        } catch (error) {
            console.log(error);
        }
    }

    /**
 * @description                      performs an insert into the specified collection
 * @param {String} collectionName    name of a collection in mongo
 * @param {Object} data              data object to insert into mongo collection
 */

    async function save(collectionName, data) {
        try {
            const collection = db.collection(collectionName);
            await collection.insertOne(data);
        } catch (error) {
            console.log(error);
        }
    }

    /**
     * @description                      performs a query on a mongo collection by deckId
     * @param {String} collectionName    name of a collection in mongo
     * @param {Object} deckIdentifier    deckId to query
     * @return {Object or Array}         the card object by deck id or all results
     */
    
    async function find(collectionName, idMeal) {
        try {
            const collection = db.collection(collectionName);

            if (idMeal) {
                return await collection.find({ id: idMeal }).next();
            } else {
                return await collection.find({}).toArray();
            }
        } catch (error) {
            console.log(error);
        }
    }

    async function findSearchTerm(collectionName, term) {
        try {
            const collection = db.collection(collectionName);
            let count = 0;

            if(term) {
                console.log('Item has been searched for already');
                return await collection.findSearchTerm({lastSearched: new Date()}).next();
            } else {
                return await collection.findSearchTerm({
                    searchTerm: term,
                    searchCount: count+1,
                    lastSearched: 0}).toArray();
            }

        } catch (error) {
            console.log(error);
        }
    }

    /**
     * @description                      performs an update on a mongo collection by deckId
     * @param {String} collectionName    name of a collection in mongo
     * @param {Object} deckIdentifier    deckId to query
     * @param {Object} data              data to update into mongo collection
     */
    async function update(collectionName, idMeal, data) {
        try {
            const collection = db.collection(collectionName);

            await collection.updateOne(
                { id: idMeal },
                { $set: data }
            );
        } catch (error) {
            console.log(error);
        }
    }

    return {
        connect,
        save,
        find,
        update,
        findSearchTerm
    };
};

module.exports = mongo();

