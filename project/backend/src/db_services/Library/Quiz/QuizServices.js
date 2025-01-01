const db = require('@/database.js');

// read services
async function GetAllQuiz() {
    const [records] = await db.query(`SELECT * FROM quiz WHERE Is_public = true`);
    return records;
}

async function GetSpecificQuiz(QuizId) {
    const [records] = await db.query(`SELECT * FROM quiz WHERE Quiz_id = ?`, [QuizId]);
    return records;
}

async function GetSpecificFolderQuiz(FolderId) {
    const [records] = await db.query(`SELECT * FROM quiz WHERE folder_id = ?`, [FolderId]);
    return records;
}

async function GetRandomQuizzes(number) {
    const [records] = await db.query(`SELECT * FROM quiz WHERE Is_public = true ORDER BY RAND() LIMIT ?`, [number]);
    return records;
}


// create services
async function CreateQuiz(BodyData) {
    const [result] = await db.query(`INSERT INTO quiz (Quiz_name, Is_public, Folder_id, Quiz_description) VALUES (?, ?, ?, ?)`, 
                                    [BodyData.Quiz_name, BodyData.Is_public, BodyData.Folder_id, BodyData.Quiz_description]);
    return result;
}

// update services
async function UpdateQuiz(BodyData, QuizId) {
    const [result] = await db.query(`UPDATE quiz SET Quiz_name = ?, Is_public = ?, Folder_id = ?, Quiz_description = ? WHERE Quiz_id = ?`, 
                                    [BodyData.Quiz_name, BodyData.Is_public, BodyData.Folder_id, BodyData.Quiz_description, QuizId]);
    return result.affectedRows;
}

// delete services
async function DeleteQuiz(QuizId) {
    const [result] = await db.query(`DELETE FROM quiz WHERE Quiz_id = ?`, [QuizId]);
    return result.affectedRows;
}

module.exports = {
    GetAllQuiz,
    GetSpecificQuiz,
    GetSpecificFolderQuiz,
    GetRandomQuizzes,
    CreateQuiz,
    UpdateQuiz,
    DeleteQuiz
};