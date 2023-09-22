const promisePool = require('../../config/database');

exports.read = async () => {
    try {
      // Query the database using promises
      const [rows, _] = await promisePool.query('SELECT * FROM persons');
      return rows
    } catch (error) {
      return null;
    }
  }
  
exports.readById = async (id) => {
    try {
        const [rows, _] = await promisePool.query(`SELECT * FROM persons
                                                   WHERE id = ${id}`);
        return rows;
    } catch (error) {
        return null;
    }
}

exports.create = async (data) => {
    try {
        const [rows, _] = await promisePool.query(`INSERT INTO persons (name)
                                                   VALUES ('${data.name}')`);
        return rows;
    } catch (error) {
        return null;
    }
}

exports.update = async (id, data) => {
  try {
    const [rows, _] = await promisePool.query(`UPDATE persons
                                               SET name = '${data.name}'
                                               WHERE id = ${id};`)
    return rows;
  } catch (error) {
    return null;
  }
}

exports.delete = async (id) => {
  try {
    const [rows, _] = await promisePool.query(`DELETE FROM persons
                                               WHERE id = ${id}`);
    return rows;
  } catch (error) {
    return null;
  }
}