const sql = require('mssql')

require('dotenv').config({ path: './config/db.env' });
const dbHost = process.env.DBHOST
const database = process.env.DATABASE
const dbPort = process.env.DBPORT || "1433";
const mssqlInstanceName = process.env.MSSQL_INSTANCE_NAME || "CDMINSTANCE"
const username =process.env.USERNAME || "sa";
const password = process.env.PASSWORD

// 'mssql://User:Password@ComputerName/\Instance/DatabaseName'
// Following example:
// const config = 'mssql://.\\Administrator:<password>@10.15.152.125/\CDMINSTANCE/mssqlDatabase1';
// const config = `mssql://.\\${username}:${password}@${dbHost}:${dbport}/\\${mssqlInstanceName}/${database}`;

const sqlConfig = {
  user: username,
  password: password,
  database: `${database}`,
  server: `${dbHost}\\${mssqlInstanceName}`, 
  port: parseInt(dbPort, 10),
  options: {
    enableArithAbort: true,
    encrypt: true,
    trustServerCertificate: true,
    trustedConnection:true
  }
};

const poolPromise = new sql.ConnectionPool(sqlConfig)
  .connect()
  .then(pool => {
    console.log('Connected to SQLServer...');
    return pool
  })
  .catch(err => console.log('Database Connection Failed! Bad Config: ', err));

  // Creates the table if it does not exist
  (async () => {
    try {
        const pool = await poolPromise;

        const tableCreationQuery = `
        IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'mssql-db')
        BEGIN
            CREATE TABLE mssql-db (
                id INT,
                name VARCHAR(255)
            );
        END;
        `

        const rs = await pool 
          .request()
          .query(tableCreationQuery);

    
    } catch (err) {
        console.error('Error:', err);
        // Re-throw the error for higher-level handling if needed
    }
})()
  


module.exports = {
  sql, poolPromise
};