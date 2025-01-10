const service = require("@/db_services/Library/Question/TF_QuestionServices.js");

async function CreateTFQuestion(req, res) {
    const newTFQue = req.body;
    const newID = await service.CreateTFQuestion(newTFQue);

    res.status(200).send(JSON.stringify(newID));
}

module.exports = {
    CreateTFQuestion,
};