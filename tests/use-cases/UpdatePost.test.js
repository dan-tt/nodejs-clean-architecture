const UpdatePost = require('../../src/use-cases/posts/UpdatePost');
const PostRepository = require('../../src/repositories/PostRepository');

jest.mock('../../src/repositories/PostRepository');

describe('UpdatePost Use Case', () => {
    let updatePost;
    let postRepository;

    beforeEach(() => {
        postRepository = new PostRepository();
        updatePost = new UpdatePost(postRepository);
        PostRepository.mockClear();
    });

    it('should update an existing post', async () => {
        const postId = 'postId123';
        const existingPost = { id: postId, title: 'Old Title', content: 'Old Content' };
        const updateData = { title: 'Updated Title' };

        // Mock the repository methods
        postRepository.findById.mockResolvedValue(existingPost);
        postRepository.update.mockResolvedValue({ ...existingPost, ...updateData });

        // Call the updatePost use case
        const updatedPost = await updatePost.execute(postId, updateData);

        // Expectation: The updated post should contain the merged data
        expect(updatedPost).toEqual({ ...existingPost, ...updateData });

        // Expectation: The correct methods should be called with the correct arguments
        expect(postRepository.findById).toHaveBeenCalledWith(postId);
        expect(postRepository.update).toHaveBeenCalledWith(postId, { ...existingPost, ...updateData });
    });

    it('should throw an error if the post does not exist', async () => {
        const postId = 'nonExistentPostId';
        const updateData = { title: 'Updated Title' };

        // Mock findById to return null (post not found)
        postRepository.findById.mockResolvedValue(null);

        // Expect the use case to throw an error when the post is not found
        await expect(updatePost.execute(postId, updateData)).rejects.toThrow('Post not found');

        expect(postRepository.findById).toHaveBeenCalledWith(postId);
        expect(postRepository.update).not.toHaveBeenCalled();
    });
});
