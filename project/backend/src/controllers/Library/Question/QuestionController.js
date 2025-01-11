const Service = require("@/db_services/Library/Question/QuestionServices.js");

async function GetQuestionsByQuizID(req, res) {
    const question = await Service.GetQuestionsByQuizID(req.params.Quiz_id);

    res.status(200).send(question);
}

module.exports = {
    GetQuestionsByQuizID,
};