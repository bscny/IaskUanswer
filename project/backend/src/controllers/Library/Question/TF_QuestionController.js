const service = require("@/db_services/Library/Question/TF_QuestionServices.js");

async function CreateTFQuestion(req, res) {
    const newTFQue = req.body;
    const newID = await service.CreateTFQuestion(newTFQue);

    res.status(200).send(JSON.stringify(newID));
}

async function UpdateTFQuestion(req, res) {
    const newTFQue = req.body;

    await service.UpdateTFQuestion(newTFQue, req.params.TF_id);

    res.status(200).send("successful");
}

async function DeleteTFQuestion(req, res) {
    await service.DeleteTFQuestion(req.params.TF_id);

    res.status(200).send("successful");
}

module.exports = {
    CreateTFQuestion,
    UpdateTFQuestion,
    DeleteTFQuestion
};