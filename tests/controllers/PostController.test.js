const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const postRoutes = require('../../src/posts/frameworks-drivers/express/postRoutes');
const PostRepository = require('../../src/posts/interface-adapters/repositories/PostRepository');
const CreatePost = require('../../src/posts/use-cases/CreatePost');

jest.mock('../../src/posts/interface-adapters/repositories/PostRepository');
jest.mock('../../src/posts/use-cases/CreatePost');

const app = express();
app.use(bodyParser.json());
app.use('/api/posts', postRoutes);

describe('PostController', () => {
  let postRepositoryMock, createPostMock;

  beforeEach(() => {
    postRepositoryMock = new PostRepository();
    createPostMock = new CreatePost(postRepositoryMock);
    createPostMock.execute = jest.fn();
  });

  it('should create a new post', async () => {
    // Arrange
    const postData = { title: 'Test Post', content: 'Test Content' };
    createPostMock.execute.mockResolvedValue(postData);

    // Act
    const response = await request(app).post('/api/posts').send(postData);

    // Assert
    expect(response.status).toBe(201);
    expect(response.body).toEqual(postData);
    expect(createPostMock.execute).toHaveBeenCalledWith(postData);
  });

  // Add tests for update, delete, and get routes
});
