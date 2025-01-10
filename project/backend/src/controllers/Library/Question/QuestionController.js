const SoService = require("@/db_services/Library/Question/SO_QuestionService.js");
const TfService = require("@/db_services/Library/Question/TF_QuestionServices.js");

async function GetQuestionsByQuizID(req, res) {
    let soQuestions = await SoService.GetSpecificQuizSOQuestion(req.params.Quiz_id);
    let tfQuestion = await TfService.GetSpecificQuizTFQuestion(req.params.Quiz_id);

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

    res.status(200).send(question);
}

module.exports = {
    GetQuestionsByQuizID,
};