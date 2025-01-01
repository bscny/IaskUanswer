const express = require("express");
const router = express.Router();

const QuestionControllers = require('@/controllers/Question/SO_QuestionController.js');

// DisplaySpecificSOQuestion
router.get("/soque/SOId/:SOId", QuestionControllers.DisplaySpecificSOQuestion);

// DisplaySpecificQuizSOQuestion
router.get("/soque/QuizId/:QuizId", QuestionControllers.DisplaySpecificQuizSOQuestion);

// DisplayAllSOQuestion
router.get("/soque", QuestionControllers.DisplayALLSOQuestion);

// DisplayRandomSOQuestion
router.get("/soque/random-question/:Number", QuestionControllers.DisplayRandomSOQuestion);

// CreateSOQuestion
router.post("/soque/post", QuestionControllers.CreateSOQuestion);

// UpdateSOQuestion
router.put("/soque/put/:SOId", QuestionControllers.UpdateSOQuestion);

// DeleteSOQuestion
router.delete("/soque/delete/:SOId", QuestionControllers.DeleteSOQuestion);



module.exports = router;