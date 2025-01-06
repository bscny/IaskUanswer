const db = require('@/database.js');

async function CreateQuizRecord(Total_points, User_id, Quiz_id) {
    const result = await db.query(`INSERT INTO quiz_record
                                   (Total_points, User_id, Quiz_id)
                                   VALUES (?, ?, ?)`,
    [Total_points, User_id, Quiz_id]);

    return result[0].insertId;
}

async function UpdateQuizRecordTotalPoints(Record_id, Total_points) {
    const result = await db.query(`UPDATE quiz_record
                                   SET
                                   Total_points = ?
                                   where Record_id = ?`,
    [Total_points, Record_id]);
}

module.exports = {
    CreateQuizRecord,
    UpdateQuizRecordTotalPoints,
}