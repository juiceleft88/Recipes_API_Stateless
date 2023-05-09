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
    
    /*     async function find(collectionName, idMeal) {
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
    } */

    async function find(collectionName, term) {
        try {
            const collection = db.collection(collectionName);

            if(term) {
                return await collection.find({searchTerm : term}).next();
            } else {
                return await collection.find({}).toArray();
            }

        } catch (error) {
            console.log(error);
        }
    }

    /**
     * @description                      performs an update on a mongo collection by deckId
     * @param {String} collectionName    name of a collection in mongo
     * @param {Object} term              searchTerm to query
     * @param {Object} data              data to update into mongo collection
     */
    async function update(collectionName, term, data) {
        try {
            const collection = db.collection(collectionName);

            //using the 'searchTerm' filter, and the $set key for the new data (allows it to replace current data)
            await collection.updateOne(
                { searchTerm: term },
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
        update
    };
};

module.exports = mongo();

