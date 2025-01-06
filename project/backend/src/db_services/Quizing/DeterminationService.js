const db = require('@/database.js');

async function CreateSODetermination(SO_id, Record_id, Is_correct) {
    const result = await db.query(`INSERT INTO so_quiz_determination
                                   (SO_id, Record_id, Is_correct)
                                   VALUES (?, ?, ?)`,
    [SO_id, Record_id, Is_correct]);

    return result[0].insertId;
}

module.exports = {
    CreateSODetermination,
}