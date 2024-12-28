const db = require('@/database.js');

async function UserLoginConfirmation(UserData) {
    const { Name, Email, Password } = UserData;
    const [records] = await db.query(
        `SELECT * FROM user WHERE (Name = ? OR Email = ?) AND Password = ?`, 
        [Name, Email, Password]
    );
    if (records.length > 0) {
        return {
            Name: records[0].Name,
            UserId: records[0].User_id
        };
    } else {
        return false;
    }
}
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
    const [result] = await db.query(`DELETE FROM user WHERE User_id = ?`, [UserId]);
    return result.affectedRows;
}

module.exports = {
    UserLoginConfirmation,
    GetAllUser,
    GetSpecificUser,
    CreateUser,
    UpdateUser,
    DeleteUser,
};