const PostModel = require('../../src/database/PostModel');
const PostRepository = require('../../src/repositories/PostRepository');

jest.mock('../../src/database/PostModel');

describe('PostRepository', () => {
  let postRepository;

  beforeEach(() => {
    postRepository = new PostRepository();
  });

  it('should save a post', async () => {
    // Arrange
    const mockPost = { _id: '123', title: 'Test', content: 'Content' };
    PostModel.prototype.save = jest.fn().mockResolvedValue(mockPost);

    // Act
    const savedPost = await postRepository.save(mockPost);

    // Assert
    expect(PostModel.prototype.save).toHaveBeenCalledTimes(1);
    expect(savedPost).toEqual(mockPost);
  });

  // Add similar tests for update and delete
});
