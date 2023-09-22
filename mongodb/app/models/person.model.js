require('dotenv').config({ path: './config/db.env' });
const { client } = require("../../config/database");
const databaseName = process.env.DATABASE
const collectionName = "persons"

// Create person 
exports.create = async (data) => {
    await client.connect()
    const db = client.db(databaseName);
    const collection = db.collection(collectionName); 
    const document = { name: data.name };
    const result = await collection.insertOne(document);

    return result;
}

// Read person entries
exports.read = async () => {
    await client.connect()
    const db = client.db(databaseName);
    const collection = db.collection(collectionName); 
    const documents = await collection.find().toArray();

    return documents
}

// Update person name by id
exports.update = async (id, data) => {
    await client.connect()
    const db = client.db(databaseName);
    const collection = db.collection(collectionName); 
    const objectId = new ObjectId(id);
    const updateOperation = {
        $set: {
          name: data.name
        },
      };

    const result = await collection.updateOne({ _id: objectId }, updateOperation);

    return result;
}

// Delete person by id
exports.delete = async (id) => {
    await client.connect()
    const db = client.db(databaseName);
    const collection = db.collection(collectionName); 
    const objectId = new ObjectId(id);
    const document = await collection.deleteOne({ _id: objectId });

    return document;
}

// Read person by id
exports.readById = async (id) =>{
    await client.connect()
    const db = client.db(databaseName);
    const collection = db.collection(collectionName); 
    const objectId = new ObjectId(id);
    const document = await collection.findOne({ _id: objectId });

    return document;
}
