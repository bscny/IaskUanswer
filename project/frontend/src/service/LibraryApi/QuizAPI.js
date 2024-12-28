import api from '@/service/ApiClient';

// see FetchQuestion() and Created() in UserLibrary.vue to know what api to call


async function getQuizzesByUserFolder(folderId) {
    const response = await api.get(`/Quiz/FolderId/${folderId}`);
    return response.data;
}

export {
    getQuizzesByUserFolder
}