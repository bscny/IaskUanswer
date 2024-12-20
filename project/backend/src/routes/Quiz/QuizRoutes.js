const express = require("express");
const router = express.Router();

const QuizControllers = require('@/controllers/Quiz/QuizController.js');

//DisplayspecificQuiz
router.get("/QuizId/:QuizId", QuizControllers.DisplaySpecificQuiz);

//DisplayspecificFolderQuiz
router.get("/FolderId/:FolderId", QuizControllers.DisplaySpecificFolderQuiz);

//DisplayALLQUizs
router.get("/", QuizControllers.DisplayALLQuizs);

//CreateQuiz
router.post("/post-quiz/", QuizControllers.CreateQuiz);

//UpdateQuiz
router.put("/put-quiz/:QuizId", QuizControllers.UpdateQuiz);

//DeleteQuiz
router.delete("/delete-quiz/:QuizId", QuizControllers.DeleteQuiz);



module.exports = router;