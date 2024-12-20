const express = require("express");
const router = express.Router();

const FolderControllers = require('@/controllers/Folder/FolderController.js');
//DisplayspecificUserFolder
router.get("/:UserId", );

//DisplayALLFolders
router.get("/", );

//CreateFolder
router.post("/post-folder/", );

//UpdateFolder
router.put("/put-folder/:UserId", );

//DeleteFolder
router.delete("/delete-folder/:UserId", );


module.exports = router;