import api from '@/service/ApiClient';

// see FetchQuestion() and Created() in UserLibrary.vue to know what api to call


export async function getQuizzesByFolder(folderId) {
    const response = await api.get(`/Quiz/folder/${folderId}`);
    return response.data;
}