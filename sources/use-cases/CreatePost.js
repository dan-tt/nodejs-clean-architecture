const Post = require('../entities/Post');

class CreatePost {
  constructor(postRepository) {
    this.postRepository = postRepository;
  }

  async execute(postData) {
    const post = new Post(null, postData.title, postData.content);
    return await this.postRepository.save(post);
  }
}

module.exports = CreatePost;
