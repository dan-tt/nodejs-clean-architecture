const express = require('express');
const CreatePost = require('../use-cases/posts/CreatePost');
const UpdatePost = require('../use-cases/posts/UpdatePost');
const DeletePost = require('../use-cases/posts/DeletePost');
const PostRepository = require('../repositories/PostRepository');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();
const postRepository = new PostRepository();

router.post('/', authMiddleware, async (req, res) => {
    const createPost = new CreatePost(postRepository);
    try {
        const post = await createPost.execute({ ...req.body, user: req.user.id });
        res.status(201).json(post);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.put('/:id', authMiddleware, async (req, res) => {
    const updatePost = new UpdatePost(postRepository);
    try {
        const post = await updatePost.execute(req.params.id, req.body);
        res.status(200).json(post);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.delete('/:id', authMiddleware, async (req, res) => {
    const deletePost = new DeletePost(postRepository);
    try {
        await deletePost.execute(req.params.id);
        res.status(204).send();
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;
