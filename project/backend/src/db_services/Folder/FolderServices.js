const db = require('@/database.js');

// read services
async function GetAllFolder() {
    const [records] = await db.query(`SELECT * FROM folder`);

    return records;
}

async function GetSpecificFolder(FolderId) {
    const [records] = await db.query(`SELECT * 
                                    FROM folder 
                                    WHERE Folder_id = ?`, [FolderId]);
    return records;
}

async function GetSpecificUserFolder(UserId) {
    const [records] = await db.query(`SELECT * 
                                    FROM folder 
                                    WHERE User_id = ?`, [FolderId]);
    return records;
}
// create services
async function CreateFolder(FolderId) {

}

// update services
async function UpdateFolder(UserData, UserId) {
    
}

// delete services
async function DeleteFolder(FolderId) {
    await db.query(`DELETE FROM folder WHERE folder_id = ?`, [folderId]);
}

module.exports = {

};