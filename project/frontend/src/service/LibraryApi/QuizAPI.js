import api from '@/service/ApiClient';

// see FetchQuestion() and Created() in UserLibrary.vue to know what api to call


async function GetRandQuiz(number) {
    const response = await api.get(`/Quiz/random-quizzes/${number}`);
    
    const quizzes = response.data.map(quiz => ({
        id: quiz.Quiz_id,
        title: quiz.Quiz_name,
        description: quiz.Quiz_description
    }));
   
    return { quizzes };
}



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
    GetRandQuiz,
    getQuizzesByUserFolder,
    CreateQuiz,
    updateQuiz,
    deleteQuiz
}