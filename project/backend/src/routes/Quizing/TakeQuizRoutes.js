const express = require("express");
const router = express.Router();

const TakeQuizController = require('@/controllers/Quizing/TakeQuizController.js');

// the route address start from:
// http://localhost:PORT/take-quiz

// frontend gives a quiz id and backend send a testsheet
router.get("/get-testsheet/:Quiz_id", TakeQuizController.GetTestSheet);

module.exports = router;