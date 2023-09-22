const mysql = require('mysql2')

require('dotenv').config({ path: './config/db.env' });
const dbHost = process.env.DBHOST
const dbPort = process.env.DBPORT || 3306;
const database = process.env.DATABASE
const username =process.env.USERNAME 
const password = process.env.PASSWORD
const tableName = "persons";

// Example: jdbc:mysql://<db-host>:<db-port>/<database-name>?user=root&password=<password>
const pool = mysql.createPool({
  host: dbHost,
  port: dbPort,
  database: database,
  user: username,
  password: password,
  database: database,
  connectionLimit: 10
});

const promisePool = pool.promise();

async function connectNow() {
  console.log("Connecting to MYSQL database...");

  let tableExists = await doesTableExist();
  if (!tableExists) {
    await createTable();
  }
}

/**
 * Summary. Checks if table 'tableName' exists.
 * @returns boolean if table exists
 */
async function doesTableExist() {
  console.log(`Checking if table: ${tableName} exists...`);
  try {
      const query = `SELECT 1 FROM information_schema.tables WHERE table_name = '${tableName}' LIMIT 1`;
      const [rows, _] = await promisePool.query(query); 
      if (rows.length == 0) {
        console.log(`Table: '${tableName}' was not found.`);
        return false;
      } else {
        console.log(`Table: '${tableName}' was found.`)
        return true;
      }
  } catch (err) {
      console.log("Error querying if table exists.");
      return false;
  }
}

/**
 * Summary. Creates tables 'table'.
 */
async function createTable() {
  try { 
    const createQuery = `CREATE TABLE ${tableName} (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(20));`;
    await promisePool.query(createQuery);
    console.log(`Table: '${tableName}' created successfully.`);
  } catch (err) {
    console.log(`Table: '${tableName}' creation failed.`);
  }
}

connectNow();

module.exports = promisePool;
