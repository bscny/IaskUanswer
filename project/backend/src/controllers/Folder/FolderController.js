const service = require("@/db_services/Folder/FolderServices.js");

async function DisplayspecificUserFolder(req, res) {

}

async function DisplayspecificFolder(req, res) {

}

async function DisplayALLFolders(req, res) {

}

async function CreateFolder(req, res) {


    res.status(201).send(`create successfully`);
}

async function UpdateFolder(req, res) {

    res.status(201).send(`update successfully`);
}

async function DeleteFolder(req, res) {

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