const express = require("express");
const router = express.Router();

const QuizResultController = require('@/controllers/Quizing/QuizResultController.js');

// the route address start from:
// http://localhost:PORT/quiz-result

// frontend gives a Record_id and backend sends a quiz record
// axios are expected to get an object:
//      {
//          "Record_id": 5,
//          "Total_points": 20,
//          "Quiz_Date": "2025-01-06T14:39:11.000Z",
//          "User_id": 1,
//          "Quiz_id": 1,
//          "Quiz_name": "test q"
//      }
//
router.get("/:Record_id", QuizResultController.GetRecordByRecordID);

// frontend gives a User_id and backend sends quiz records
// axios are expected to get an array of objects, each obj are the same form as the last get method
router.get("/all-records/:User_id", QuizResultController.GetRecordsByUserID);

// frontend gives a Record_id and backend delete a quiz record
// axios are expected to get nothing(only status code):
router.delete("/delete-quiz-record/:Record_id", QuizResultController.DeleteRecordByRecordID);

// frontend gives a Record_id and backend sends every questions' result
// axios are expected to get an array of obj:
//      [
//          {
//              "Q_number": 1,
//              "Body": "hahaha",
//              "Answer": "hahaha",
//              "OptionA": "hah",
//              "OptionB": "h",
//              "OptionC": "a",
//              "Points": 10,
//              "Is_correct": 1,
//              "Choosed_ans": "hahaha",
//              "OptionD": "hahaha"
//          },
//      ]
//
router.get("/all-questions/:Record_id", QuizResultController.GetAllQuestionsInRecord);

module.exports = router;