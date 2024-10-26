const PostModel = require('../../frameworks-drivers/mongoose/PostModel');

class PostRepository {
  async save(post) {
    const postModel = new PostModel(post);
    return await postModel.save();
  }

  async findById(id) {
    return await PostModel.findById(id);
  }

  async update(id, data) {
    return await PostModel.findByIdAndUpdate(id, data, { new: true });
  }

  async delete(id) {
    return await PostModel.findByIdAndDelete(id);
  }
}

module.exports = PostRepository;
