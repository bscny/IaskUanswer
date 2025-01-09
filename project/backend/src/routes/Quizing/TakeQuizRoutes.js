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
//              "Answer": "example option3",
//              "OptionA": "example option1",
//              "OptionB": "example option2",
//              "OptionC": "example option3",
//              "OptionD": "example option4"
//          },
//      ]
//
router.get("/get-testSheet/:Quiz_id", TakeQuizController.GetTestSheet);

// frontend gives an answer sheet and backend send the newly created quiz record id
// backend suppose to get an obj (answer sheet in the order of Q_number):
//      {
//          "User_id": 1,
//          "Quiz_id": 1,
//          "Answer_sheet": [
//              {
//                  "SO_id": 1,
//                  "Q_number": 1,
//                  "Points": 10,
//                  "Choosed_ans": "example choosed answer",
//              },
//          ]
//      }
//
// axios are expected to get a ID(string) (CAUTION!!! need to use JSON.parse to parse the string to integer):
//
//      1
//
router.post("/post-answerSheet", TakeQuizController.PostAnswerSheet);

module.exports = router;