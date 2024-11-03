class CreatePost {
    constructor(postRepository) {
        this.postRepository = postRepository;
    }

    async execute(postData) {
        return await this.postRepository.save(postData);
    }
}

module.exports = CreatePost;
