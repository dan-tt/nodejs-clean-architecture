
const express = require('express');
const postRoutes = require('./routes/postRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();

// Configure express-session
const session = require('express-session');
app.use(session({
    secret: process.env.SESSION_SECRET || 'your_secret_key', // Use a secret for signing the session ID cookie
    resave: false,  // Don't save session if unmodified
    saveUninitialized: false,  // Don't create session until something is stored
    cookie: { secure: false }  // Set to true if using https
  }));

// Initialize passport
const passport = require('passport');
app.use(passport.initialize());
app.use(passport.session()); // If you're using session-based authentication

// Middleware
app.use(express.json());

// Routes
app.use('/api/posts', postRoutes);
app.use('/api/users', userRoutes);

module.exports = app;
