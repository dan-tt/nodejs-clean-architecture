const dotenv = require('dotenv');
dotenv.config();
console.log('Environment variables loaded:', process.env);

const { connectMongoDB } = require('./config/mongoConfig');
const { connectRedis } = require('./config/redisConfig');
connectMongoDB();
// connectRedis();

const app = require('./app');
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
