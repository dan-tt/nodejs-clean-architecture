const CreatePost = require('../../src/posts/use-cases/CreatePost');
const Post = require('../../src/posts/entities/Post');

describe('CreatePost Use Case', () => {
  let postRepositoryMock;

  beforeEach(() => {
    // Mock the post repository
    postRepositoryMock = {
      save: jest.fn(),
    };
  });

  it('should create and save a post', async () => {
    // Arrange
    const postData = { title: 'Test Post', content: 'This is a test.' };
    const createPost = new CreatePost(postRepositoryMock);

    // Act
    await createPost.execute(postData);

    // Assert
    expect(postRepositoryMock.save).toHaveBeenCalledTimes(1);
    expect(postRepositoryMock.save).toHaveBeenCalledWith(expect.any(Post));
  });
});
