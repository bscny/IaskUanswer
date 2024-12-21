const express = require("express");
const router = express.Router();

const UserControllers = require('@/controllers/User/UserController.js');
//DisplayUsers
router.get("/:UserId", UserControllers.DisplayUser);

//DisplayAlLUser
router.get("/", UserControllers.DisplayALLUser);

//CreateUser
router.post("/post-user/", UserControllers.CreateUser);

//UpdateUser
router.put("/put-user/:UserId", UserControllers.UpdateUser);

//DeleteUser
router.delete("/delete-user/:UserId", UserControllers.DeleteUser);


module.exports = router;