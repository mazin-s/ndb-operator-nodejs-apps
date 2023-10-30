require('dotenv').config({ path: './config/db.env' });
const { MongoClient } = require("mongodb");

const dbHost = process.env.DBHOST
const dbPort = process.env.DBPORT || "27017"
const database = process.env.DATABASE
const username = process.env.USERNAME 
const password = process.env.PASSWORD

const url = `mongodb://${username}:${password}@${dbHost}:${dbPort}/?directConnection=true`
const client = new MongoClient(url);

async function run() {
  try {
    // Connect the client to the server (optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db(username).command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");

    const adminDb = client.db(username);
    const databases = await adminDb.admin().listDatabases();
    console.log(databases);

    const collectionName = "persons";
    const collections = await client.db(database).listCollections({ name: collectionName }).toArray();
    
    console.log("Creating collection 'persons' if it does not exist...");
    if (collections.length === 0) {
      await client.db(database).createCollection(collectionName);
    console.log(`Created collection '${collectionName}'`);
    } else {
      console.log(`Collection '${collectionName}' already exists`);
    }
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);

module.exports = {
  client
};