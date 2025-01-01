const QuestionServices = require("@/db_services/Library/Question/SO_QuestionService.js");

// take a quiz id and return a testsheet
async function CreateTestSheet(Quiz_id) {
    const questions = await QuestionServices.GetSpecificQuizSOQuestion(Quiz_id);

    if(questions[0] == undefined){
        // the quizhas no question created
        return null;
    }
    
    // extract all single open question,
    // sort the question according to their q num first
    let soQuestions = [];

    for (let i = 0; i < questions.length; i ++){
        // remove unused attribute
        delete questions[i].Quiz_id

        if(questions[i].SO_id != undefined){
            // find a so question
            soQuestions.push(questions[i]);
        }else if(questions[i].TF_id != undefined){
            // find a TF question
        }else{
            // we simply skip this fill in blank stuff
        }
    }

    soQuestions.sort(function(questionA, questionB){
        return questionA.Q_number - questionB.Q_number;
    });

    // start generating random options for so questions
    for(let i = 0; i < soQuestions.length; i ++){
        // for each so question

        let options = [
            soQuestions[i].Answer,
            soQuestions[i].OptionA,
            soQuestions[i].OptionB,
            soQuestions[i].OptionC,
        ];

        // shuffle options
        for (let k = options.length - 1; k > 0; k--) {
            const j = Math.floor(Math.random() * (k + 1));
            const temp = options[k];
            options[k] = options[j];
            options[j] = temp;
        }

        // assaign options
        soQuestions[i].OptionA = options[0];
        soQuestions[i].OptionB = options[1];
        soQuestions[i].OptionC = options[2];
        soQuestions[i].OptionD = options[3];
    }

    // start generating random options for tf questions

    // merge 2 type of questions by Q_number
    let testSheet = soQuestions;

    return testSheet;
}

async function GetTestSheet(req, res) {
    const testSheet = await CreateTestSheet(req.params.Quiz_id);

    if(testSheet != null){
        res.status(200).send(testSheet);
    }else{
        res.status(500).send("testSheet generate failed");
    }
}

module.exports = {
    GetTestSheet,
};