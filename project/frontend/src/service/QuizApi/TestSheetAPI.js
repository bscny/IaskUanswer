import api from '@/service/ApiClient';

async function getTestSheetByQuizID(quizId) {
    const response = await api.get(`/take-quiz/get-testSheet/${quizId}`);
    return response.data;
}

async function submitTestSheet(sheet) {
    const response = await api.post('/take-quiz/post-answerSheet', sheet);
    return response.data;
}
export {
    getTestSheetByQuizID,
    submitTestSheet
}