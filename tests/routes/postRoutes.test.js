const request = require('supertest');
const app = require('../../src/app'); // Ensure your app is exported from app.js
const PostRepository = require('../../src/repositories/PostRepository');

jest.mock('../../src/repositories/PostRepository');
require('dotenv').config();

describe('Post Routes', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should create a post', async () => {
        const postData = { title: 'New Post', content: 'Post content', user: 'userId123' };
        PostRepository.prototype.save.mockResolvedValue(postData);

        const response = await request(app).post('/api/posts').send(postData);

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('title', 'New Post');
        expect(response.body).toHaveProperty('content', 'Post content');
    });

    it('should update a post', async () => {
        const postId = 'postId123';
        const existingPost = { id: postId, title: 'Old Title', content: 'Old Content' };
        const updateData = { title: 'Updated Title' };

        PostRepository.prototype.findById.mockResolvedValue(existingPost);
        PostRepository.prototype.update.mockResolvedValue({ ...existingPost, ...updateData });

        const response = await request(app).put(`/api/posts/${postId}`).send(updateData);

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('title', 'Updated Title');
    });

    it('should return 404 if trying to update a non-existing post', async () => {
        const postId = 'nonExistingPostId';
        const updateData = { title: 'Updated Title' };

        PostRepository.prototype.findById.mockResolvedValue(null); // Simulate post not found

        const response = await request(app).put(`/api/posts/${postId}`).send(updateData);

        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty('error', 'Post not found');
    });

    it('should delete a post', async () => {
        const postId = 'postId123';
        const existingPost = { id: postId, title: 'Post to delete', content: 'Content' };

        PostRepository.prototype.findById.mockResolvedValue(existingPost);
        PostRepository.prototype.delete.mockResolvedValue(existingPost);

        const response = await request(app).delete(`/api/posts/${postId}`);

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('id', postId);
    });

    it('should return 404 if trying to delete a non-existing post', async () => {
        const postId = 'nonExistingPostId';

        PostRepository.prototype.findById.mockResolvedValue(null); // Simulate post not found

        const response = await request(app).delete(`/api/posts/${postId}`);

        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty('error', 'Post not found');
    });
});
