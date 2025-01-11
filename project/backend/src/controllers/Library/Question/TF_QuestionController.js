const Services = require("@/db_services/Library/Question/QuestionServices.js");
const SoServices = require("@/db_services/Library/Question/SO_QuestionService.js");
const TfServices = require("@/db_services/Library/Question/TF_QuestionServices.js");

async function CreateTFQuestion(req, res) {
    const newTFQue = req.body;
    const newID = await TfServices.CreateTFQuestion(newTFQue);

    res.status(200).send(JSON.stringify(newID));
}

async function UpdateTFQuestion(req, res) {
    const newTFQue = req.body;

    await TfServices.UpdateTFQuestion(newTFQue, req.params.TF_id);

    res.status(200).send("successful");
}

async function DeleteTFQuestion(req, res) {
    // before delete, update all Q_number grater than target
    let soTypeQuestions = await Services.GetSOQuestionsAfterGivenTFQue(req.params.TF_id);
    let tfTypeQuestions = await Services.GetTFQuestionsAfterGivenTFQue(req.params.TF_id);

    for (let i = 0; i < soTypeQuestions.length; i++) {
        await SoServices.UpdateSOQuestionQnum(soTypeQuestions[i].SO_id, soTypeQuestions[i].Q_number - 1);
    }

    for (let i = 0; i < tfTypeQuestions.length; i++) {
        await TfServices.UpdateTFQuestionQnum(tfTypeQuestions[i].TF_id, tfTypeQuestions[i].Q_number - 1);
    }

    await TfServices.DeleteTFQuestion(req.params.TF_id);

    res.status(200).send("successful");
}

module.exports = {
    CreateTFQuestion,
    UpdateTFQuestion,
    DeleteTFQuestion
};