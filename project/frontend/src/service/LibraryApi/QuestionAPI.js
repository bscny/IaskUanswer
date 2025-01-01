import api from '@/service/ApiClient';

// see FetchQuestion() and Created() in UserLibrary.vue to know waht api to call

async function getQuestionsByQuiz(quizId) {
    const response = await api.get(`/Question/soque/QuizId/${quizId}`);
    return response.data;
}

async function createQuestion(questionData) {
    const response = await api.post('/Question/soque/post', questionData);
    return response.data;
}

async function updateQuestion(questionData) {
    const response = await api.put(`/Question/soque/put/${questionData.SO_id}`, questionData);
    return response.data;
}

async function deleteQuestion(questionId) {
    const response = await api.delete(`/Question/soque/delete/${questionId}`);
    return response.data;
}

export{
    getQuestionsByQuiz,
    createQuestion,
    updateQuestion,
    deleteQuestion
}