const db = require('@/database.js');

async function CreateSODetermination(SO_id, Record_id, Is_correct, Choosed_ans) {
    const result = await db.query(`INSERT INTO so_quiz_determination
                                   (SO_id, Record_id, Is_correct, Choosed_ans)
                                   VALUES (?, ?, ?, ?)`,
    [SO_id, Record_id, Is_correct, Choosed_ans]);
}

module.exports = {
    CreateSODetermination,
}