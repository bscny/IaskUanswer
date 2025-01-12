const redisClient = require('@/redis.js');

async function CreateTestSheet(Quiz_id, TestSheet) { 
    for (const question of TestSheet) {
        await redisClient.rPush(`TestSheet:${Quiz_id}`, JSON.stringify(question));
    }
}

async function GetTestSheet(Quiz_id) {
    const result = await redisClient.lRange(`TestSheet:${Quiz_id}`, 0, -1);

    const parsedTestSheets = result.map(item => JSON.parse(item));

    return parsedTestSheets;
}

async function DeleteTestSheet(Quiz_id) {
    await redisClient.del(`TestSheet:${Quiz_id}`);
}

module.exports = {
    CreateTestSheet,
    GetTestSheet,
    DeleteTestSheet,
};