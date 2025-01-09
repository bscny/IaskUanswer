import api from '@/service/ApiClient';

async function getTestSheetByQuizID(quizId) {
    const response = await api.get(`/take-quiz/get-testSheet/${quizId}`);
    return response.data;
}

async function submitTestSheet_fake(sheet) {
    return {
        data: {
            recordID: 123
        },
        status:200
    };
}
export {
    getTestSheetByQuizID,
    submitTestSheet_fake
}