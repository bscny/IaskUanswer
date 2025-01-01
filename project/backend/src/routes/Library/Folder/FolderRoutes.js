const express = require("express");
const router = express.Router();

const FolderControllers = require('@/controllers/Library/Folder/FolderController.js');

//DisplayspecificFolder
router.get("/FolderId/:FolderId", FolderControllers.DisplayspecificFolder);

//DisplayspecificUserFolder
router.get("/UserId/:UserId", FolderControllers.DisplayspecificUserFolder);

//DisplayALLFolders
router.get("/", FolderControllers.DisplayALLFolders);

//CreateFolder
router.post("/post-folder/", FolderControllers.CreateFolder);

//UpdateFolder
router.put("/put-folder/:FolderId", FolderControllers.UpdateFolder);

//DeleteFolder
router.delete("/delete-folder/:FolderId", FolderControllers.DeleteFolder);



module.exports = router;