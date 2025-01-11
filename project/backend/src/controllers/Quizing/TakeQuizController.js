const SoQuestionServices = require("@/db_services/Library/Question/SO_QuestionService.js");
const tfQuestionServices = require("@/db_services/Library/Question/TF_QuestionServices.js");
const RecordServices = require("@/db_services/Quizing/RecordService.js");
const DeterminationServices = require("@/db_services/Quizing/DeterminationService.js");

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
    let soQuestions = await SoQuestionServices.GetSpecificQuizSOQuestion(Quiz_id);
    let tfQuestions = await tfQuestionServices.GetSpecificQuizTFQuestion(Quiz_id);
    
    // sort the question according to their q num first
    soQuestions.sort(function(questionA, questionB){
        return questionA.Q_number - questionB.Q_number;
    });

    tfQuestions.sort(function(questionA, questionB){
        return questionA.Q_number - questionB.Q_number;
    });

    // start grading
    let testResult = []; // will stores this array to redis in the future
    let totalPoints = 0;

    let soIndex = 0;
    let tfIndex = 0;

    for (let i = 0; i < answerSheet.length; i ++){
        // for each question sort by to Q_number
        let isCorrect = false;
        
        if(answerSheet[i].SO_id != undefined){
            // make sure dealing with SO question

            // check for safty
            if(answerSheet[i].SO_id !== soQuestions[soIndex].SO_id){
                console.log("ERROR in grading SO! Q_number unmatch!");
                return null;
            }

            if(answerSheet[i].Choosed_ans == soQuestions[soIndex].Answer){
                // correct
                isCorrect = true;
                totalPoints += soQuestions[soIndex].Points;
            }else{
                // wrong
                isCorrect = false;
            }

            testResult.push({
                Q_number: soQuestions[soIndex].Q_number,
                Body: soQuestions[soIndex].Body,
                Answer: soQuestions[soIndex].Answer,
                // after using redis, this part will be the same as the question's options
                // right now i just use fixed position
                OptionA: soQuestions[soIndex].Answer,
                OptionB: soQuestions[soIndex].OptionA,
                OptionC: soQuestions[soIndex].OptionB,
                OptionD: soQuestions[soIndex].OptionC,
                Points: soQuestions[soIndex].Points,
                Is_correct: isCorrect,
                Choosed_ans: answerSheet[soIndex].Choosed_ans
            });

            // save to MySql table so_quiz_determination
            await DeterminationServices.CreateSODetermination(soQuestions[soIndex].SO_id, Record_id, isCorrect, answerSheet[i].Choosed_ans);

            soIndex ++;
        }else if(answerSheet[i].TF_id != undefined){
            // make sure dealing with TF question

            // check for safty
            if(answerSheet[i].TF_id !== tfQuestions[tfIndex].TF_id){
                console.log("ERROR in grading TF! Q_number unmatch!");
                return null;
            }

            if(answerSheet[i].Choosed_ans == tfQuestions[tfIndex].Answer){
                // correct
                isCorrect = true;
                totalPoints += tfQuestions[tfIndex].Points;
            }else{
                // wrong
                isCorrect = false;
            }

            testResult.push({
                Q_number: tfQuestions[tfIndex].Q_number,
                Body: tfQuestions[tfIndex].Body,
                Answer: tfQuestions[tfIndex].Answer,
                Points: tfQuestions[tfIndex].Points,
                Is_correct: isCorrect,
            });

            // save to MySql table tf_quiz_determination
            await DeterminationServices.CreateTFDetermination(tfQuestions[tfIndex].TF_id, Record_id, isCorrect);

            tfIndex ++;
        }
    }

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