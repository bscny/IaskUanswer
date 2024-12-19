const db = require('@/database.js');

// read services
async function GetAllUser() {
    const [records] = await db.query(`select *
                                      from user
                                      `);

    return records;
}

async function GetSepecificUser(name) {
    const [records] = await db.query(`select *
                                      from user
                                      `);

    return records;
}
// delete services

// create services


// update services

module.exports = {
    GetAllUser,
};