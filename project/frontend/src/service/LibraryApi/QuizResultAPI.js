import api from '@/service/ApiClient';

// get all records by this user
async function getUserRecords(userId) {
    try {
        const response = await api.get(`/quiz-result/all-records/${userId}`);
        return response.data;
    } catch (error) {
        console.error("Failed to fetch all records:", error);
        throw error;
    }
}

// get the record by record ID
async function getRecordByRecordID(recordId) {
    try {
        const response = await api.get(`/quiz-result/${recordId}`);
        return response.data;
    } catch (error) {
        console.error(`Failed to fetch record with ID ${recordId}:`, error);
        throw error;
    }
}

// delete the record by record ID
async function deleteRecordByRecordID(recordId) {
    try {
        await api.delete(`/quiz-result/delete-quiz-record/${recordId}`);
    } catch (error) {
        console.error(`Failed to delete record with ID ${recordId}:`, error);
        throw error;
    }
}

// get all questions in this record
async function getAllQuestionsInRecord(recordId) {
    try {
        const response = await api.get(`/quiz-result/all-questions/${recordId}`);
        return response.data;
    } catch (error) {
        console.error(`Failed to fetch questions for record with ID ${recordId}:`, error);
        throw error;
    }
}

export {
    getUserRecords,
    getRecordByRecordID,
    deleteRecordByRecordID,
    getAllQuestionsInRecord
}