const redisClient = require('../../../config/redisConfig');

class CacheRepository {
  async set(key, value, ttl = 3600) {
    await redisClient.setex(key, ttl, JSON.stringify(value));
  }

  async get(key) {
    const data = await redisClient.get(key);
    return data ? JSON.parse(data) : null;
  }

  async del(key) {
    await redisClient.del(key);
  }
}

module.exports = CacheRepository;
