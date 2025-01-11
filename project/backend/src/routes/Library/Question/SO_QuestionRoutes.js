const express = require("express");
const router = express.Router();

const QuestionControllers = require('@/controllers/Library/Question/SO_QuestionController.js');

// the route address start from:
// http://localhost:PORT/Question/soque

// DisplaySpecificSOQuestion
router.get("/SOId/:SOId", QuestionControllers.DisplaySpecificSOQuestion);

// DisplaySpecificQuizSOQuestion
router.get("/QuizId/:QuizId", QuestionControllers.DisplaySpecificQuizSOQuestion);

// DisplayAllSOQuestion
router.get("/", QuestionControllers.DisplayALLSOQuestion);

// DisplayRandomSOQuestion
router.get("/random-question/:Number", QuestionControllers.DisplayRandomSOQuestion);

// CreateSOQuestion
router.post("/post", QuestionControllers.CreateSOQuestion);

// UpdateSOQuestion
router.put("/put/:SOId", QuestionControllers.UpdateSOQuestion);

// DeleteSOQuestion
router.delete("/delete/:SOId", QuestionControllers.DeleteSOQuestion);



module.exports = router;