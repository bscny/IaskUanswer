const RecordServices = require("@/db_services/Quizing/RecordService.js");
const DeterminationServices = require("@/db_services/Quizing/DeterminationService.js")
const QuizServices = require("@/db_services/Library/Quiz/QuizServices.js");

async function GetRecordByRecordID(req, res) {
    let result = await RecordServices.GetQuizRecordByID(req.params.Record_id);

    if(result.Record_id == undefined){
        res.status(500).send("Error getting a Quiz Record by Record_id");
        return;
    }

    // add quiz name to this data
    const Quiz = await QuizServices.GetSpecificQuiz(result.Quiz_id);

    result.Quiz_name = Quiz.Quiz_name;

    res.status(200).send(result);
}

async function GetRecordsByUserID(req, res) {
    let result = await RecordServices.GetQuizRecordsByUser(req.params.User_id);

    // if(result[0] == undefined){
    //     res.status(500).send("Error getting Quiz Records by User_id");
    //     return;
    // }

    // add quiz name to each data
    for(let i = 0; i < result.length; i ++){
        const Quiz = await QuizServices.GetSpecificQuiz(result[i].Quiz_id);
    
        result[i].Quiz_name = Quiz.Quiz_name;
    }

    res.status(200).send(result);
}

async function DeleteRecordByRecordID(req, res) {
    const result = await RecordServices.DeleteQuizRecordByID(req.params.Record_id);

    res.status(200).send("Delete Successfully");
}

async function GetAllQuestionsInRecord(req, res) {
    // get all so question after the quiz
    let result = await DeterminationServices.GetAllSOQuestionResult(req.params.Record_id);

    if(result[0] == undefined){
        res.status(500).send("Error getting SO questions' results by Record_id");
        console.log(result);
        return;
    }

    // sort all SO question results according to Q_number
    result.sort(function(questionA, questionB){
        return questionA.Q_number - questionB.Q_number;
    });

    // arrange each queation's options
    for(let i = 0; i < result.length; i ++){
        // assign optionD with the correct answer first,
        // after using redis, this step is not needed
        result[i].OptionD = result[i].Answer;
    }

    res.status(200).send(result);
}

module.exports = {
    DeleteRecordByRecordID,
    GetRecordByRecordID,
    GetRecordsByUserID,
    GetAllQuestionsInRecord,
};