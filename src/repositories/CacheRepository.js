const redisClient = require('../config/redisConfig');

class CacheRepository {
    async set(key, value) {
        return redisClient.set(key, JSON.stringify(value));
    }

    async get(key) {
        return new Promise((resolve, reject) => {
            redisClient.get(key, (err, result) => {
                if (err) reject(err);
                resolve(JSON.parse(result));
            });
        });
    }

    async delete(key) {
        return redisClient.del(key);
    }
}

module.exports = CacheRepository;
