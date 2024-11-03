class UpdatePost {
    constructor(postRepository) {
        this.postRepository = postRepository;
    }

    async execute(postId, updateData) {
        const existingPost = await this.postRepository.findById(postId);

        if (!existingPost) {
            throw new Error('Post not found');
        }

        // Merge the existing post data with the update data
        const updatedPostData = { ...existingPost, ...updateData };
        return await this.postRepository.update(postId, updatedPostData);
    }
}

module.exports = UpdatePost;
