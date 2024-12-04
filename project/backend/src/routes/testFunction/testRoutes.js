const express = require("express");
const router = express.Router();

const testControllers = require('@/controllers/testFunction/testController.js');

// real http addr is:
// http://localhost:PORT/test

router.get("/", testControllers.Testing);

module.exports = router;