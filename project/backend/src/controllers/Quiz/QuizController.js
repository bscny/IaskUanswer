const service = require("@/db_services/Quiz/QuizServices.js");

// Read services
async function DisplaySpecificQuiz(req, res) {
    const quiz = await service.GetSpecificQuiz(req.params.QuizId);
    res.send(quiz);
}

async function DisplaySpecificFolderQuiz(req, res) {
    const quizzes = await service.GetSpecificFolderQuiz(req.params.FolderId);
    res.send(quizzes);
}

async function DisplayALLQuizs(req, res) {
    const quizzes = await service.GetAllQuiz();
    res.send(quizzes);
}

// Create services
async function CreateQuiz(req, res) {
    const result = await service.CreateQuiz(req.body);
    if (result == 0) {
        res.status(400).send(`creation failed`);
    } else {
        res.status(201).send(`create successfully`);
    }
}

// Update services
async function UpdateQuiz(req, res) {
    const result = await service.UpdateQuiz(req.body, req.params.QuizId);
    if (result == 0) {
        res.status(404).send(`no quiz with ID: ${req.params.QuizId}`);
    } else {
        res.status(200).send(`update successfully, affected rows: ${result}`);
    }
}

// Delete services
async function DeleteQuiz(req, res) {
    const result = await service.DeleteQuiz(req.params.QuizId);
    if(result == 0){
        res.status(404).send(`no quiz with ID: ${req.params.QuizId}`);
    } else {
        res.send(`delete successfully, affected rows: ${result}`);
    }
}

module.exports = {
    DisplaySpecificQuiz,
    DisplaySpecificFolderQuiz,
    DisplayALLQuizs,
    CreateQuiz,
    UpdateQuiz,
    DeleteQuiz,
};