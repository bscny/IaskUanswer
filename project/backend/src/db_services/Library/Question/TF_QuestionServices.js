const db = require('@/database.js');

// read services
async function GetSpecificTFQuestion(TF_id) {
    const [records] = await db.query(`SELECT * FROM tf_question WHERE TF_id = ?`, [TF_id]);
    return records[0];
}

async function GetSpecificQuizTFQuestion(Quiz_Id) {
    const [records] = await db.query(`SELECT * FROM tf_question WHERE Quiz_Id = ?`, [Quiz_Id]);
    return records;
}

// create services
async function CreateTFQuestion(QuestionData) {
    const { Q_number, Body, Points, Answer, Quiz_id } = QuestionData;
    const result = await db.query(`INSERT INTO tf_question 
                                   (Q_number, Body, Points, Answer, Quiz_id) 
                                   VALUES (?, ?, ?, ?, ?)`, 
                                   [Q_number, Body, Points, Answer, Quiz_id]);

    return result[0].insertId;
}

// update services
async function UpdateTFQuestion(QuestionData, TF_id) {
    const { Q_number, Body, Points, Answer} = QuestionData;
    await db.query(`UPDATE tf_question 
                    SET Q_number = ?, Body = ?, Points = ?, Answer = ?
                    WHERE TF_id = ?`, 
                    [Q_number, Body, Points, Answer, TF_id]);
}

async function UpdateTFQuestionQnum(TF_id, Q_number) {
    await db.query(`UPDATE tf_question 
                    SET Q_number = ?
                    WHERE TF_id = ?`, 
                    [Q_number, TF_id]);
}

// delete services
async function DeleteTFQuestion(TF_id) {
    const [result] = await db.query(`DELETE FROM tf_question WHERE TF_id = ?`, [TF_id]);
    return result;
}

module.exports = {
    GetSpecificTFQuestion,
    GetSpecificQuizTFQuestion,
    CreateTFQuestion,
    UpdateTFQuestion,
    UpdateTFQuestionQnum,
    DeleteTFQuestion,
};