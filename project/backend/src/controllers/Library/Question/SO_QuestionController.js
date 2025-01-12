const Service = require("@/db_services/Library/Question/QuestionServices.js");
const SoServices = require("@/db_services/Library/Question/SO_QuestionService.js");
const TfServices = require("@/db_services/Library/Question/TF_QuestionServices.js");

const RedisServices = require("@/redis_services/Quizing/TestSheetServices.js");

async function DisplaySpecificSOQuestion(req, res) {
    try {
        const { SOId } = req.params;
        const question = await SoServices.GetSpecificSOQuestion(SOId);
        if (question.length === 0) {
            return res.status(404).json({ message: "Question not found" });
        }
        res.status(200).json(question);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
}

async function DisplayALLSOQuestion(req, res) {
    try {
        const questions = await SoServices.GetAllSOQuestion();
        res.status(200).json(questions);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
}

async function DisplaySpecificQuizSOQuestion(req, res) {
    try {
        const { QuizId } = req.params;
        const questions = await SoServices.GetSpecificQuizSOQuestion(QuizId);
        res.status(200).json(questions);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
}

async function DisplayRandomSOQuestion(req, res) {
    try {
        const number = parseInt(req.params.Number, 10);
        const questions = await SoServices.GetRandomSOQuestion(number);
        res.status(200).json(questions);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
}

async function CreateSOQuestion(req, res) {
    try {
        const newQuestion = req.body;
        const questionId = await SoServices.CreateSOQuestion(newQuestion);

        await RedisServices.DeleteTestSheet(newQuestion.Quiz_id);

        res.status(201).json({ message: "Question created", questionId });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
}

async function UpdateSOQuestion(req, res) {
    try {
        const { SOId } = req.params;
        const updatedData = req.body;
        await SoServices.UpdateSOQuestion(updatedData, SOId);

        await RedisServices.DeleteTestSheet(updatedData.Quiz_id);

        res.status(200).json({ message: "Question updated" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
}

async function DeleteSOQuestion(req, res) {
    try {
        const { SOId } = req.params;
        // before delete, update all Q_number grater than target
        let soTypeQuestions = await Service.GetSOQuestionsAfterGivenSOQue(SOId);
        let tfTypeQuestions = await Service.GetTFQuestionsAfterGivenSOQue(SOId);

        for(let i = 0; i < soTypeQuestions.length; i ++){
            await SoServices.UpdateSOQuestionQnum(soTypeQuestions[i].SO_id, soTypeQuestions[i].Q_number - 1);
        }

        for(let i = 0; i < tfTypeQuestions.length; i ++){
            await TfServices.UpdateTFQuestionQnum(tfTypeQuestions[i].TF_id, tfTypeQuestions[i].Q_number - 1);
        }
        
        const result = await SoServices.DeleteSOQuestion(SOId);

        await RedisServices.DeleteTestSheet(req.params.Quiz_id);

        if (result.affectedRows === 0) {
            res.status(404).send(`no question with ID: ${SOId}`);
        } else {
            res.send(`delete successfully, affected rows: ${result.affectedRows}`);
        }
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
}


module.exports = {
    DisplaySpecificSOQuestion,
    DisplayALLSOQuestion,
    DisplaySpecificQuizSOQuestion,
    DisplayRandomSOQuestion,
    CreateSOQuestion,
    UpdateSOQuestion,
    DeleteSOQuestion
};