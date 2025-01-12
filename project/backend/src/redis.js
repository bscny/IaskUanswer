const Redis = require("redis");

const redisCli = Redis.createClient()

async function TestConnection() {
    try {
        // trying to connect to redis server locally on port 6379
        await redisCli.connect();
        console.log('Redis client connected successfully');
    } catch (err) {
        console.error('Failed to connect to Redis:', err);
        process.exit(1); // Exit the process with a failure code
    }
}
TestConnection();

module.exports = redisCli;