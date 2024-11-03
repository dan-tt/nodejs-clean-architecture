const PostModel = require('../database/PostModel');

class PostRepository {
    async save(postData) {
        const post = new PostModel(postData);
        return await post.save();
    }

    async findById(id) {
        return await PostModel.findById(id).populate('user');
    }

    async deleteById(id) {
        return await PostModel.findByIdAndDelete(id);
    }

    async update(id, postData) {
        return await PostModel.findByIdAndUpdate(id, postData, { new: true });
    }
}

module.exports = PostRepository;
