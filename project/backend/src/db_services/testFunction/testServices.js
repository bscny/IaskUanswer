const db = require('@/database.js');

// read services
async function GetTest(Id) {
    const [records] = await db.query(`select *
                                      from test
                                      where Id = ?`, [Id]);

    return records;
}

// delete services

// create services


// update services

module.exports = {
    GetTest,
};