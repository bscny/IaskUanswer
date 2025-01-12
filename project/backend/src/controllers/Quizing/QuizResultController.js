const RecordServices = require("@/db_services/Quizing/RecordService.js");
const DeterminationServices = require("@/db_services/Quizing/DeterminationService.js")
const QuizServices = require("@/db_services/Library/Quiz/QuizServices.js");

const QuestionResultServices = require("@/redis_services/Quizing/RecordServices.js");

async function GetRecordByRecordID(req, res) {
    let result = await RecordServices.GetQuizRecordByID(req.params.Record_id);

    if (result.Record_id == undefined) {
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
    for (let i = 0; i < result.length; i++) {
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
    // check redis first, if cache hits, use it
    const cacheResult = await QuestionResultServices.GetQuestionResults(req.params.Record_id);

    if (cacheResult[0] != undefined) {
        res.status(200).send(cacheResult);
        console.log("Redis HIT! quiz result's questions found");

        return;
    }

    // get all question after taking the quiz
    let soResult = await DeterminationServices.GetAllSOQuestionResult(req.params.Record_id);
    let tfResult = await DeterminationServices.GetAllTFQuestionResult(req.params.Record_id);

    if (soResult[0] == undefined && tfResult[0] == undefined) {
        res.status(500).send("Error getting questions' results by Record_id");
        return;
    }

    // sort all question results according to Q_number
    soResult.sort(function (questionA, questionB) {
        return questionA.Q_number - questionB.Q_number;
    });

    tfResult.sort(function (questionA, questionB) {
        return questionA.Q_number - questionB.Q_number;
    });

    // arrange each SO queation's options
    for (let i = 0; i < soResult.length; i++) {
        // assign optionD with the correct answer first,
        // after using redis, this step is not needed
        soResult[i].OptionD = soResult[i].Answer;
    }

    // merge 2 type of questions by Q_number
    let result = [];

    let soIndex = 0;
    let tfIndex = 0;

    while (soIndex < soResult.length && tfIndex < tfResult.length) {
        if (soResult[soIndex].Q_number < tfResult[tfIndex].Q_number) {
            result.push(soResult[soIndex]);

            soIndex++;
        } else {
            result.push(tfResult[tfIndex]);

            tfIndex++;
        }
    }

    while (soIndex < soResult.length) {
        result.push(soResult[soIndex]);

        soIndex++;
    }

    while (tfIndex < tfResult.length) {
        result.push(tfResult[tfIndex]);

        tfIndex++;
    }

    res.status(200).send(result);
}

module.exports = {
    DeleteRecordByRecordID,
    GetRecordByRecordID,
    GetRecordsByUserID,
    GetAllQuestionsInRecord,
};