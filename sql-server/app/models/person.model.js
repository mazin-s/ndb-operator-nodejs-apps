const { poolPromise } = require('../../config/database')


// Create person 
exports.create = async (data) => {
    const pool = await poolPromise;

    const rs = await pool
        .request()
        .query(`INSERT INTO persons (name)
                VALUES ('${data.name}')`)

    return rs.rowsAffected;
}

// Read person entries
exports.read = async () => {
    const pool = await poolPromise;
    const rs = await pool
        .request()
        .query(`SELECT *
                FROM persons`)

    return rs.recordset;
}

// Update person name by id
exports.update = async (id, data) => {
    const pool = await poolPromise;
    const rs = await pool
        .request()
        .query(`UPDATE persons SET
                name = '${data[0].name}'                    
                WHERE id = ${id}`);

    return rs.rowsAffected;
}

// Delete person by id
exports.delete = async (id) => {
    const pool = await poolPromise;
    const rs = await pool
        .request()
        .query(`DELETE FROM persons
                WHERE id = ${id}`)

    return rs.rowsAffected;
}

// Read person by id
exports.readById = async (id) =>{
    const pool = await poolPromise;
    const rs = await pool
            .request()
            .query(`SELECT *
                    FROM persons 
                    WHERE id = ${id} `);
    
            return rs.recordset;
}