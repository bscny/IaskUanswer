import api from '@/service/ApiClient';

//  Fetch all quiz records for a specific user.
async function getAllRecords(userId) {
    try {
        const response = await api.get(`/quiz-result/all-records/${userId}`);
        return response.data;
    } catch (error) {
        console.error("Failed to fetch all records:", error);
        throw error;
    }
}

//  Fetch a specific quiz record by its ID.
async function getRecordByRecordID(recordId) {
    try {
        const response = await api.get(`/quiz-result/${recordId}`);
        return response.data;
    } catch (error) {
        console.error(`Failed to fetch record with ID ${recordId}:`, error);
        throw error;
    }
}

//  Delete a specific quiz record by its ID.

async function deleteRecordByRecordID(recordId) {
    try {
        await api.delete(`/quiz-result/delete-quiz-record/${recordId}`);
    } catch (error) {
        console.error(`Failed to delete record with ID ${recordId}:`, error);
        throw error;
    }
}


//  Fetch all questions and their results for a specific quiz record.

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
    getAllRecords,
    getRecordByRecordID,
    deleteRecordByRecordID,
    getAllQuestionsInRecord
}