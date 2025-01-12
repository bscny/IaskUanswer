const SoQuestionServices = require("@/db_services/Library/Question/SO_QuestionService.js");
const tfQuestionServices = require("@/db_services/Library/Question/TF_QuestionServices.js");
const RecordServices = require("@/db_services/Quizing/RecordService.js");
const DeterminationServices = require("@/db_services/Quizing/DeterminationService.js");

const TestSheetServices = require("@/redis_services/Quizing/TestSheetServices.js");
const QuestionResultServices = require("@/redis_services/Quizing/RecordServices.js");

// take a quiz id and return a testsheet
async function CreateTestSheet(Quiz_id) {
    let soQuestions = await SoQuestionServices.GetSpecificQuizSOQuestion(Quiz_id);
    let tfQuestions = await tfQuestionServices.GetSpecificQuizTFQuestion(Quiz_id);

    if(soQuestions[0] == undefined && tfQuestions[0] == undefined){
        // the quiz has no question created
        return null;
    }

    // remove unused attribute
    for (let i = 0; i < soQuestions.length; i ++){
        delete soQuestions[i].Quiz_id;
    }

    for (let i = 0; i < tfQuestions.length; i ++){
        delete tfQuestions[i].Quiz_id;
    }

    // sort the question according to their q num
    soQuestions.sort(function(questionA, questionB){
        return questionA.Q_number - questionB.Q_number;
    });

    tfQuestions.sort(function(questionA, questionB){
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

    // merge 2 type of questions by Q_number
    let testSheet = [];

    let soIndex = 0;
    let tfIndex = 0;

    while(soIndex < soQuestions.length && tfIndex < tfQuestions.length){
        if(soQuestions[soIndex].Q_number < tfQuestions[tfIndex].Q_number){
            testSheet.push(soQuestions[soIndex]);

            soIndex ++;
        }else{
            testSheet.push(tfQuestions[tfIndex]);

            tfIndex ++;
        }
    }

    while(soIndex < soQuestions.length){
        testSheet.push(soQuestions[soIndex]);

        soIndex ++;
    }

    while(tfIndex < tfQuestions.length){
        testSheet.push(tfQuestions[tfIndex]);

        tfIndex ++;
    }

    // save tis test sheet to redis
    await TestSheetServices.CreateTestSheet(Quiz_id, testSheet);

    return testSheet;
}

async function GetTestSheet(req, res) {
    // check redis first, if cache hits, use it
    let testSheet = await TestSheetServices.GetTestSheet(req.params.Quiz_id);
    
    if(testSheet[0] != undefined){
        res.status(200).send(testSheet);

        return;
    }

    // not found in redis, go back to mysql to create one
    testSheet = await CreateTestSheet(req.params.Quiz_id);

    if(testSheet != null){
        res.status(200).send(testSheet);
    }else{
        res.status(500).send("testSheet generate failed");
    }
}

async function Grading(answerSheet, Quiz_id, Record_id) {
    // get original test sheet first
    const testSheet = await TestSheetServices.GetTestSheet(Quiz_id);

    if(testSheet[0] == undefined){
        res.status(500).send("something wrong while getting test sheet to grade, try later");

        return;
    }

    // start grading
    let testResult = []; // will stores this array to redis's list
    let totalPoints = 0;

    for (let i = 0; i < answerSheet.length; i ++){
        // for each question sort by to Q_number
        let isCorrect = false;

        if(answerSheet[i].Choosed_ans == testSheet[i].Answer){
            // correct
            isCorrect = true;
            totalPoints += testSheet[i].Points;
        }else{
            // wrong
            isCorrect = false;
        }

        testResult.push(Object.assign({}, testSheet[i]));
        
        if(answerSheet[i].SO_id != undefined){
            // make sure dealing with SO question

            // remove un-used attributes
            delete testResult[i].SO_id;

            // add new attributes
            testResult[i].Is_correct = isCorrect;
            testResult[i].Choosed_ans = answerSheet[i].Choosed_ans;

            // save to MySql table so_quiz_determination
            await DeterminationServices.CreateSODetermination(testSheet[i].SO_id, Record_id, isCorrect, answerSheet[i].Choosed_ans);
        }else if(answerSheet[i].TF_id != undefined){
            // make sure dealing with TF question

            // remove un-used attributes
            delete testResult[i].TF_id;

            // add new attributes
            testResult[i].Is_correct = isCorrect;

            // save to MySql table tf_quiz_determination
            await DeterminationServices.CreateTFDetermination(testSheet[i].TF_id, Record_id, isCorrect);
        }
    }

    // save result to redis
    await QuestionResultServices.CreateQuestionResults(Record_id, testResult);

    return totalPoints;
}

async function PostAnswerSheet(req, res) {
    const answer = req.body;

    if(answer.User_id == undefined || answer.Quiz_id == undefined){
        res.status(500).send("wrong form of answer sheet submitted");
        return;
    }

    // Create a Quiz_record with no Total_points
    const newRecordID = await RecordServices.CreateQuizRecord(0, answer.User_id, answer.Quiz_id);

    if(newRecordID == undefined){
        res.status(500).send("something wrong while creating record");
        return;
    }
    
    let score = await Grading(answer.Answer_sheet, answer.Quiz_id, newRecordID);

    // update the Total_points of the newly created Quiz_record
    await RecordServices.UpdateQuizRecordTotalPoints(newRecordID, score);

    res.status(200).send(JSON.stringify(newRecordID));
}

module.exports = {
    GetTestSheet,
    PostAnswerSheet
};