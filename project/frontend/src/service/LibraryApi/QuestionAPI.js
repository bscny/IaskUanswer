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

async function deleteQuestion(questionId, Quiz_id) {
    const response = await api.delete(`/Question/soque/delete/${questionId}/${Quiz_id}`);
    return response.data;
}

// newly added api for TF question
async function GetQuestionsByQuizID(Quiz_id) {
    const response = await api.get(`/Question/quizId/${Quiz_id}`);

    if(response.status != 200){
        alert("something wrong... try later");
        return null;
    }

    return response.data;
}

async function CreateTFQuestion(questionData) {
    const response = await api.post('/Question/tfque/post', questionData);

    if(response.status != 200){
        alert("something wrong... try later");
        return null;
    }

    return response.data;  // a created ID
}

async function UpdateTFQuestion(questionData) {
    const response = await api.put(`/Question/tfque/put/${questionData.TF_id}`, questionData);

    if(response.status != 200){
        alert("something wrong... try later");
    }
}

async function DeleteTFQuestion(TF_id, Quiz_id) {
    const response = await api.delete(`/Question/tfque/delete/${TF_id}/${Quiz_id}`);

    if(response.status != 200){
        alert("something wrong... try later");
    }
}

export{
    getQuestionsByQuiz,
    createQuestion,
    updateQuestion,
    deleteQuestion,

    GetQuestionsByQuizID,
    CreateTFQuestion,
    UpdateTFQuestion,
    DeleteTFQuestion
}