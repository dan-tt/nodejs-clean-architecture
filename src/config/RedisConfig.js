const redis = require('redis');
const client = redis.createClient({ url: process.env.REDIS_URL });

const connectRedis = () => {
  client.on('connect', () => {
    console.log('Redis client connected');
  });
  client.on('error', (err) => {
    console.error('Redis connection error:', err);
  });
};

module.exports = { connectRedis, client };
