const express = require("express");
const router = express.Router();

const QuestionControllers = require('@/controllers/Library/Question/TF_QuestionController.js');

// the route address start from:
// http://localhost:PORT/Question/tfque

// DisplaySpecificQuizSOQuestion
// router.get("/QuizId/:QuizId", QuestionControllers.DisplaySpecificQuizSOQuestion);

// CreateSOQuestion
router.post("/post", QuestionControllers.CreateTFQuestion);

// UpdateSOQuestion
router.put("/put/:TF_id", QuestionControllers.UpdateTFQuestion);

// DeleteSOQuestion
router.delete("/delete/:TF_id", QuestionControllers.DeleteTFQuestion);

module.exports = router;