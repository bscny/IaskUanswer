const redisClient = require('@/redis.js');

async function CreateQuestionResults(Record_id, QuestionResults) { 
    for (const questionResult of QuestionResults) {
        await redisClient.rPush(`Record:${Record_id}:Question_result`, JSON.stringify(questionResult));
    }

    // set ttl of 30 days
    await redisClient.expire(`Record:${Record_id}:Question_result`, 30*24*60*60);
}

async function GetQuestionResults(Record_id) {
    const result = await redisClient.lRange(`Record:${Record_id}:Question_result`, 0, -1);

    const parsedQuizResults = result.map(item => JSON.parse(item));

    return parsedQuizResults;
}

async function DeleteQuestionResults(Record_id) {
    await redisClient.del(`Record:${Record_id}:Question_result`);
}

module.exports = {
    CreateQuestionResults,
    GetQuestionResults,
    DeleteQuestionResults,
};