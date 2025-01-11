import api from '@/service/ApiClient';

// get all records by this user
async function getUserRecords(userId) {
    const response = await api.get(`/quiz-result/all-records/${userId}`);
    return response.data;
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

export {
    getUserRecords,
    deleteRecordByRecordID,
}