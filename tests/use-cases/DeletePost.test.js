const DeletePost = require('../../src/use-cases/posts/DeletePost');
const PostRepository = require('../../src/repositories/PostRepository');
const Post = require('../../src/domain/entities/Post');

jest.mock('../../src/repositories/PostRepository'); // Mock the PostRepository

describe('DeletePost Use Case', () => {
    let deletePost;
    let postRepository;

    beforeEach(() => {
        postRepository = new PostRepository();
        deletePost = new DeletePost(postRepository); // Inject the mock repository
        PostRepository.mockClear(); // Clear mocks before each test
    });

    it('should delete a post by ID', async () => {
        const postId = 'postId123';
        
        // Arrange
        const mockPost = { _id: postId, title: 'Test', content: 'Content' };
        Post.prototype.save.mockResolvedValue(mockPost);

        // Act
        const savedPost = await postRepository.save(mockPost);

        // Mock the repository method for deleting the post
        postRepository.deleteById.mockResolvedValue({ id: postId });

        // Call the DeletePost use case
        const result = await deletePost.execute(postId);

        // Expectations
        expect(result).toEqual(savedPost);
        expect(postRepository.deleteById).toHaveBeenCalledWith(postId);
    });

    it('should throw an error if post is not found', async () => {
        const postId = 'nonExistingPostId';

        // Mock the repository method to simulate post not found
        postRepository.deleteById.mockResolvedValue(null);

        await expect(deletePost.execute(postId)).rejects.toThrow('Post not found');
        expect(postRepository.deleteById).toHaveBeenCalledWith(postId);
    });
});
