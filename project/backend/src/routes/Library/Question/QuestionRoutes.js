const express = require("express");
const router = express.Router();

const QuestionControllers = require('@/controllers/Library/Question/QuestionController.js');

// the route address start from:
// http://localhost:PORT/Question

router.get("/quizId/:Quiz_id", QuestionControllers.GetQuestionsByQuizID);

module.exports = router;