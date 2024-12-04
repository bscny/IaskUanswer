const service = require("@/db_services/testFunction/testServices.js");

async function Testing(req, res) {
    const result = await service.GetTest(req.params.Id);

    res.send(result);
}

module.exports = {
    Testing,
};