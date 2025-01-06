const QuestionServices = require("@/db_services/Library/Question/SO_QuestionService.js");
const RecordServices = require("@/db_services/Quizing/RecordService.js")
const DeterminationServices = require("@/db_services/Quizing/DeterminationService.js")

// take a quiz id and return a testsheet
async function CreateTestSheet(Quiz_id) {
    const questions = await QuestionServices.GetSpecificQuizSOQuestion(Quiz_id); // this place should call get all Q in quiz in the future 

    if(questions[0] == undefined){
        // the quiz has no question created
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

async function Grading(answerSheet, Quiz_id, Record_id) {
    // get each questions' answer first
    let questions = await QuestionServices.GetSpecificQuizSOQuestion(Quiz_id); // this place should call get all Q in quiz in the future
    
    // sort the question according to their q num first
    questions.sort(function(questionA, questionB){
        return questionA.Q_number - questionB.Q_number;
    });

    // start grading
    let testResult = []; // will stores this array to redis in the future
    let totalPoints = 0;

    for (let i = 0; i < answerSheet.length; i ++){
        // for each question sort by to Q_number
        let isCorrect = false;
        
        if(answerSheet[i].Choosed_ans == questions[i].Answer){
            // correct
            isCorrect = true;
            totalPoints += questions[i].Points;
        }else{
            // wrong
            isCorrect = false;
        }

        if(answerSheet[i].SO_id != undefined){
            // make sure dealing with SO question
            testResult.push({
                Q_number: questions[i].Q_number,
                Body: questions[i].Body,
                Answer: questions[i].Answer,
                // after using redis, this part will be the same as the question's options
                // right now i just use fixed position
                OptionA: questions[i].Answer,
                OptionB: questions[i].OptionA,
                OptionC: questions[i].OptionB,
                OptionD: questions[i].OptionC,
                Points: questions[i].Points,
                Is_correct: isCorrect,
                Choosed_ans: answerSheet[i].Choosed_ans
            });

            // save to MySql table so_quiz_determination
            await DeterminationServices.CreateSODetermination(questions.SO_id, Record_id, isCorrect, answerSheet[i].Choosed_ans);
        }
    }

    return totalPoints;
}

async function PostAnswerSheet(req, res) {
    const answer = req.body;

    if(answer.User_id == undefined){
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