import api from '@/service/ApiClient';

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
    getAllQuestionsInRecord
}