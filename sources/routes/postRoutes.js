const express = require('express');
const PostController = require('../../interface-adapters/controllers/PostController');

const router = express.Router();

router.post('/', PostController.createPost);

// Add routes for update, delete, get post

module.exports = router;
