import api from '@/service/ApiClient';

// see FetchQuestion() and Created() in UserLibrary.vue to know waht api to call

async function createFolder(folderData) {
    const response = await api.post('/Folder/post-folder/', folderData);
    return response.data;
}

async function updateFolder(folderId, folderData) {
    const response = await api.put(`/Folder/put-folder/${folderId}`, folderData);
    return response.data;
}

async function deleteFolder(folderId) {
    const response = await api.delete(`/Folder/delete-folder/${folderId}`);
    return response.data;
}

export{
    createFolder,
    updateFolder,
    deleteFolder
}