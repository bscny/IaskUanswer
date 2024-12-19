const express = require("express");
const router = express.Router();

const AllUserNameController = require('@/controllers/User/UserController.js');

// real http addr is:
// http://localhost:PORT/test

router.get("/", AllUserNameController.GetUser);

module.exports = router;