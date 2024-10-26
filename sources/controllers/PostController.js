const CreatePost = require('../../use-cases/CreatePost');
const PostRepository = require('../repositories/PostRepository');

const postRepository = new PostRepository();

class PostController {
  static async createPost(req, res) {
    const { title, content } = req.body;
    const createPost = new CreatePost(postRepository);

    try {
      const post = await createPost.execute({ title, content });
      res.status(201).json(post);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Add similar methods for updatePost, deletePost, getPost
}

module.exports = PostController;
