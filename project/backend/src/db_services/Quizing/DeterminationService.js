const db = require('@/database.js');

async function CreateSODetermination(SO_id, Record_id, Is_correct, Choosed_ans) {
    const result = await db.query(`INSERT INTO so_quiz_determination
                                   (SO_id, Record_id, Is_correct, Choosed_ans)
                                   VALUES (?, ?, ?, ?)`,
    [SO_id, Record_id, Is_correct, Choosed_ans]);
}

async function GetAllSOQuestionResult(Record_id) {
    const [result] = await db.query(`select Q.Q_number, Q.Body, Q.Answer, Q.OptionA, Q.OptionB, Q.OptionC, Q.Points, S.Is_correct, S.Choosed_ans
                                     from so_quiz_determination as S, single_open_question as Q
                                     where S.Record_id = ? and S.SO_id = Q.SO_id;`,
    [Record_id]);

    return result;
}

module.exports = {
    CreateSODetermination,
    GetAllSOQuestionResult,
}