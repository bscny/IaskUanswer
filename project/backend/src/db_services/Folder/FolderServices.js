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
                                    WHERE User_id = ?`, [UserId]);
    return records;
}

// create services
async function CreateFolder(BodyData) {
    const [records] = await db.query(`insert into folder(Name, parent_folder_id)
                                      values
                                      (?, ?)`, [BodyData.Name, BodyData.parent_folder_id]);

    return records;
}

// update services
async function UpdateFolder(BodyData, FolderId) {
    const [records] = await db.query(`update folders
        set
        Name = ?,
        parent_folder_id = ?
        where Folder_id = ?`, [BodyData.Name, BodyData.parent_folder_id, FolderId]);

    return records;
}

// delete services
async function DeleteFolder(FolderId) {
    const [records] = await db.query(`delete
                                      from folder
                                      where Folder_id = ?`, [FolderId]);

    return records.affectedRows;
}


module.exports = {
    GetAllFolder,
    GetSpecificFolder,
    GetSpecificUserFolder,
    CreateFolder,
    UpdateFolder,
    DeleteFolder
};