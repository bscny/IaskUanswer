const service = require("@/db_services/Question/SO_QuestionService.js");

async function DisplaySpecificSOQuestion(req, res) {
    try {
        const { SOId } = req.params;
        const question = await service.GetSpecificSOQuestion(SOId);
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
        const questions = await service.GetAllSOQuestion();
        res.status(200).json(questions);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
}

async function DisplaySpecificQuizSOQuestion(req, res) {
    try {
        const { QuizId } = req.params;
        const questions = await service.GetSpecificQuizSOQuestion(QuizId);
        res.status(200).json(questions);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
}

async function DisplayRandomSOQuestion(req, res) {
    try {
        const number = parseInt(req.params.Number, 10);
        const questions = await service.GetRandomSOQuestion(number);
        res.status(200).json(questions);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
}
async function CreateSOQuestion(req, res) {
    try {
        const newQuestion = req.body;
        const questionId = await service.CreateSOQuestion(newQuestion);
        res.status(201).json({ message: "Question created", questionId });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
}

async function UpdateSOQuestion(req, res) {
    try {
        const { SOId } = req.params;
        const updatedData = req.body;
        await service.UpdateSOQuestion(updatedData, SOId);
        res.status(200).json({ message: "Question updated" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
}

async function DeleteSOQuestion(req, res) {
    try {
        const { SOId } = req.params;
        const result = await service.DeleteSOQuestion(SOId);
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