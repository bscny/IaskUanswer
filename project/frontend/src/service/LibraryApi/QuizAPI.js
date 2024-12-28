import api from '@/service/ApiClient';

// see FetchQuestion() and Created() in UserLibrary.vue to know what api to call


async function getQuizzesByUserFolder(folderId) {
    const response = await api.get(`/Quiz/FolderId/${folderId}`);
    return response.data;
}

async function CreateQuiz(quizData) {
    const response = await api.post(`/Quiz/post-quiz/`, quizData);
    return response.data;
}

async function updateQuiz(quizId, quizData) {
    const response = await api.put(`/Quiz/put-quiz/${quizId}`, quizData);
    return response.data;
}

async function deleteQuiz(quizId) {
    const response = await api.delete(`/Quiz/delete-quiz/${quizId}`);
    return response.data;
}

export {
    getQuizzesByUserFolder,
    CreateQuiz,
    updateQuiz,
    deleteQuiz
}