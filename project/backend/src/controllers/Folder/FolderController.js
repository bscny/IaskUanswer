const service = require("@/db_services/Folder/FolderServices.js");

//Read services
async function DisplayspecificUserFolder(req, res) {
    const FolderName = await service.GetSpecificUserFolder(req.params.UserId);

    res.send(FolderName);
}

async function DisplayspecificFolder(req, res) {
    const FolderName = await service.GetSpecificFolder(req.params.FolderId);

    res.send(FolderName);
}

async function DisplayALLFolders(req, res) {
    const AllFolders = await service.GetAllFolder();

    res.send(AllFolders);
}

//Create services
async function CreateFolder(req, res) {
    await service.CreateFolder(req.body);

    res.status(201).send(`create successfully`);
}

//Update services
async function UpdateFolder(req, res) {
    await service.UpdateFolder(req.params.FolderId, req.body);

    res.status(201).send(`update successfully`);
}

//Delete services
async function DeleteFolder(req, res) {
    const result = await service.DeleteFolder(req.params.FolderId);
    
    if(result == 0){
        res.status(404).send(`no set with ID: ${req.params.UserId}`);
    }else{
        res.send(`delete successfully, affected rows: ${result}`);
    }
}


module.exports = {
    DisplayspecificUserFolder,
    DisplayspecificFolder,
    DisplayALLFolders,
    CreateFolder,
    UpdateFolder,
    DeleteFolder,
};