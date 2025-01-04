const express = require("express");
const router = express.Router();

const TakeQuizController = require('@/controllers/Quizing/TakeQuizController.js');

// the route address start from:
// http://localhost:PORT/take-quiz

// frontend gives a quiz id and backend send a testsheet
// axios are expected to get an array of obj:
//
//      [
//          {
//              "SO_id": 1,
//              "Q_number": 1,
//              "Body": "am i gay",
//              "Points": 10,
//              "Answer": "no ",
//              "OptionA": "y",
//              "OptionB": "y",
//              "OptionC": "no ",
//              "OptionD": "y"
//          },
//      ]
//
router.get("/get-testSheet/:Quiz_id", TakeQuizController.GetTestSheet);

// frontend gives an answer sheet and backend send the newly created quiz record id
// axios are expected to get a number:
//
//  1
//
router.post("/post-answerSheet", TakeQuizController.PostAnswerSheet)

module.exports = router;