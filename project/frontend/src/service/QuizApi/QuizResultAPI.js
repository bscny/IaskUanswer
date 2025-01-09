import api from '@/service/ApiClient';

// get all records by user ID
async function getAllRecordsByUserID(userId) {
    try {
        const response = await api.get(`/quiz-result/all-records/${userId}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching records by user ID:", error);
        throw error;
    }
}

// delete quiz record by record ID
async function deleteQuizRecordByRecordID(recordId) {
    try {
        const response = await api.delete(`/quiz-result/delete-quiz-record/${recordId}`);
        return response.status;
    } catch (error) {
        console.error("Error deleting quiz record by record ID:", error);
        throw error;
    }
}

// get all questions in record
async function getAllQuestionsInRecord(recordId) {
    try {
        const response = await api.get(`/quiz-result/all-questions/${recordId}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching all questions in record ${recordId}:`, error.response ? error.response.data : error.message);
        throw error;
    }
}

// get record by record ID
async function getRecordByRecordID(recordId) {
    try {
        const response = await api.get(`/quiz-result/${recordId}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching record by record ID:", error);
        throw error;
    }
}

export {
    getAllRecordsByUserID,
    deleteQuizRecordByRecordID,
    getAllQuestionsInRecord,
    getRecordByRecordID
};