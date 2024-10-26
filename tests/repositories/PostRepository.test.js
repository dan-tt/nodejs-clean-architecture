const mongoose = require('mongoose');
const PostModel = require('../../src/posts/frameworks-drivers/mongoose/PostModel');
const PostRepository = require('../../src/posts/interface-adapters/repositories/PostRepository');

jest.mock('../../src/posts/frameworks-drivers/mongoose/PostModel');

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

  it('should find a post by ID', async () => {
    // Arrange
    const mockPost = { _id: '123', title: 'Test', content: 'Content' };
    PostModel.findById = jest.fn().mockResolvedValue(mockPost);

    // Act
    const foundPost = await postRepository.findById('123');

    // Assert
    expect(PostModel.findById).toHaveBeenCalledWith('123');
    expect(foundPost).toEqual(mockPost);
  });

  // Add similar tests for update and delete
});
