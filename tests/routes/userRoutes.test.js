const request = require('supertest');
const app = require('../../src/app'); // Ensure your app is exported from app.js
const UserRepository = require('../../src/repositories/UserRepository');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

jest.mock('../../src/repositories/UserRepository');
jest.mock('passport', () => ({
    use: jest.fn(),
    authenticate: jest.fn(() => (req, res, next) => {
      req.user = { id: 'mockUserId', email: 'test@example.com' }; // Mock a user object
      next();
    }),
  }));
  

require('dotenv').config();

describe('User Routes', () => {
    it('should sign up a user', async () => {
        UserRepository.prototype.save.mockResolvedValue({ name: 'John Doe', email: 'john@example.com' });

        const response = await request(app).post('/api/users/signup').send({
            name: 'John Doe',
            email: 'john@example.com',
            password: 'password123',
        });

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('name', 'John Doe');
    });

    it('should sign in a user', async () => {
        UserRepository.prototype.findByEmail.mockResolvedValue({
            email: 'john@example.com',
            password: 'hashed_password', // Assuming this is a hashed password
        });

        const response = await request(app).post('/api/users/signin').send({
            email: 'john@example.com',
            password: 'password123',
        });

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('user.email', 'john@example.com');
    });

    it('should log in a user via Google', async () => {
        const response = await request(app)
          .post('/signin/google')
          .send(); // Simulate sending the Google OAuth login request
    
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('token'); // Assuming the route sends back a token
      });
});
