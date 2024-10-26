const express = require('express');
const connectDB = require('./config/dbConfig');
const postRoutes = require('./posts/frameworks-drivers/express/postRoutes');

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());

// Routes
app.use('/api/posts', postRoutes);

module.exports = app;
