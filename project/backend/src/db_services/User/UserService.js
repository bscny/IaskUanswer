const db = require('@/database.js');

// read services
async function GetAllUser() {
    const [records] = await db.query(`SELECT * FROM user`);

    return records;
}

async function GetSpecificUser(UserId) {
    const [records] = await db.query(`SELECT * 
                                    FROM user 
                                    WHERE User_id = ?`, [UserId]);
    return records;
}

// create services
async function CreateUser(UserData) {
    const { Name, Email, Password } = UserData;
    const result = await db.query(`INSERT INTO user (Name, Email, Password) VALUES (?, ?, ?)`, [Name, Email, Password]);
    return result.insertId;
}

// update services
async function UpdateUser(UserData, UserId) {
    const { Name, Email, Password } = UserData;
    await db.query(`UPDATE user SET Name = ?, Email = ?, Password = ? WHERE User_id = ?`, [Name, Email, Password, UserId]);
}

// delete services
async function DeleteUser(UserId) {
    await db.query(`DELETE FROM user WHERE User_id = ?`, [UserId]);
}

module.exports = {
    GetAllUser,
    GetSpecificUser,
    CreateUser,
    UpdateUser,
    DeleteUser,
};