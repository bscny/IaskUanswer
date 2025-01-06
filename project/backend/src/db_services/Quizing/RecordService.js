const db = require('@/database.js');

async function CreateQuizRecord(Total_points, User_id, Quiz_id) {
    const result = await db.query(`INSERT INTO quiz_record
                                   (Total_points, User_id, Quiz_id)
                                   VALUES (?, ?, ?)`,
    [Total_points, User_id, Quiz_id]);

    return result[0].insertId;
}

module.exports = {
    CreateQuizRecord,
}