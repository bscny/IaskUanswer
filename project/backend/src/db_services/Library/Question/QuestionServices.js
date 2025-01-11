const db = require('@/database.js');
const SoService = require("@/db_services/Library/Question/SO_QuestionService.js");
const TfService = require("@/db_services/Library/Question/TF_QuestionServices.js");

async function GetQuestionsByQuizID(Quiz_id) {
    let soQuestions = await SoService.GetSpecificQuizSOQuestion(Quiz_id);
    let tfQuestion = await TfService.GetSpecificQuizTFQuestion(Quiz_id);

    soQuestions.sort(function(questionA, questionB){
        return questionA.Q_number - questionB.Q_number;
    });

    tfQuestion.sort(function(questionA, questionB){
        return questionA.Q_number - questionB.Q_number;
    });

    // merge 2 like merge sort
    let question = [];
    let soIndex = 0;
    let tfIndex = 0;

    while(soIndex < soQuestions.length && tfIndex < tfQuestion.length){
        if(soQuestions[soIndex].Q_number < tfQuestion[tfIndex].Q_number){
            question.push(soQuestions[soIndex]);

            soIndex ++;
        }else{
            question.push(tfQuestion[tfIndex]);

            tfIndex ++;
        }
    }

    while(soIndex < soQuestions.length){
        question.push(soQuestions[soIndex]);

        soIndex ++;
    }

    while(tfIndex < tfQuestion.length){
        question.push(tfQuestion[tfIndex]);

        tfIndex ++;
    }

    return question;
}

async function GetSOQuestionsAfterGivenSOQue(SO_id) {
    const [records] = await db.query(`select S.*
                                      from single_open_question as S, single_open_question as SS
                                      where SS.SO_id = ? and SS.Quiz_id = S.Quiz_id and S.Q_number > SS.Q_number`, [SO_id]);

    return records;
}

async function GetTFQuestionsAfterGivenSOQue(SO_id) {
    const [records] = await db.query(`select T.*
                                      from single_open_question as S, tf_question as T
                                      where S.SO_id = ? and S.Quiz_id = T.Quiz_id and T.Q_number > S.Q_number`, [SO_id]);

    return records;
}

async function GetSOQuestionsAfterGivenTFQue(TF_id) {
    const [records] = await db.query(`select S.*
                                      from single_open_question as S, tf_question as T
                                      where T.TF_id = ? and T.Quiz_id = S.Quiz_id and S.Q_number > T.Q_number`, [TF_id]);

    return records;
}

async function GetTFQuestionsAfterGivenTFQue(TF_id) {
    const [records] = await db.query(`select T.*
                                      from tf_question as T, tf_question as TT
                                      where TT.TF_id = ? and TT.Quiz_id = T.Quiz_id and T.Q_number > TT.Q_number`, [TF_id]);

    return records;
}

module.exports = {
    GetQuestionsByQuizID,

    GetSOQuestionsAfterGivenSOQue,
    GetTFQuestionsAfterGivenSOQue,
    GetSOQuestionsAfterGivenTFQue,
    GetTFQuestionsAfterGivenTFQue
};