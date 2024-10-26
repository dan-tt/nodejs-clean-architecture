# nodejs-clean-architecture
 RESTful API Project with Clean Architecture

## Overview
This project is a RESTful API application built with Express.js, MongoDB, and Redis, following the principles of Clean Architecture combined with Vertical and Horizontal Architecture structures.

The API supports the following features:

- User sign-up by email
- User login by email (JWT-based authentication)
- Google login (OAuth)
- Apple login (OAuth)
- Post management (create, update, delete, find posts)

## Table of Contents

* Installation
* Configuration
* API Endpoints
* * User Endpoints
* * Post Endpoints
* Authentication
* * Email Authentication
* * Google Login
* * Apple Login
* Running Tests
* Project Structure
* Technologies
* Installation

## Installation
```bash
cd nodejs-clean-architecture
npm install
```
## Configuration
You will need to set up environment variables for MongoDB, Redis, and OAuth providers (Google and Apple). Create a .env file in the project root with the following values:
```sh
# MongoDB
MONGODB_URI=mongodb://localhost:27017/your-database-name

# Redis
REDIS_URL=redis://localhost:6379

# Google OAuth
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# Apple OAuth
APPLE_CLIENT_ID=your-apple-client-id
APPLE_TEAM_ID=your-apple-team-id
APPLE_KEY_ID=your-apple-key-id
APPLE_PRIVATE_KEY=your-apple-private-key

# JWT Secret
JWT_SECRET=your-jwt-secret
```

## API Endpoints

### User Endpoints
#### 1. User Sign-Up
* URL: /api/users/signup
* Method: POST
* Request Body:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}

```
* Response:
```json
{
  "message": "User registered successfully",
  "user": {
    "id": "user-id",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

#### 2. User Login by Email
* URL: /api/users/login
* Method: POST
* Request Body:
```json
{
  "email": "john@example.com",
  "password": "password123"
}

```
* Response:
```json
{
  "token": "jwt-token",
  "user": {
    "id": "user-id",
    "email": "john@example.com"
  }
}
```

#### 3. Google Login
* URL: /api/auth/google
* Redirects to Google's OAuth2 login page

#### 4. Apple Login
* URL: /api/auth/apple
* Redirects to Apple’s OAuth2 login page.

### Post Endpoints
#### 1. Create Post
* URL: /api/posts
* Method: POST
* Request Body:
```json
{
  "title": "My First Post",
  "content": "This is the content of the post."
}

```
* Response:
```json
{
  "message": "Post created successfully",
  "post": {
    "id": "post-id",
    "title": "My First Post",
    "content": "This is the content of the post."
  }
}
```

#### 2. Update Post
* URL: /api/posts/:id
* Method: PUT
* Request Body:
```json
{
  "title": "Updated Post Title",
  "content": "Updated content."
}
```
* Response:
```json
{
  "message": "Post updated successfully"
}
```

#### 3. Delete Post
* URL: /api/posts/:id
* Method: DELETE
* Response:
```json
{
  "message": "Post deleted successfully"
}
```

#### 4. Find Post by ID
* URL: /api/posts/:id
* Method: GET
* Response:
```json
{
  "id": "post-id",
  "title": "Post Title",
  "content": "Post content"
}
```

## Authentication

### Email Authentication
For users logging in via email and password, JWT tokens are issued. These tokens must be included in the Authorization header for any authenticated requests.

```http
Authorization: Bearer <your-jwt-token>
```

### Google Login
For Google login, users are redirected to Google's OAuth2 flow via the /api/auth/google endpoint. On successful login, the API issues a JWT token.

###  Apple Login
For Apple login, users are redirected to Apple’s OAuth2 flow via the /api/auth/apple endpoint. On successful login, the API issues a JWT token.

## Running the Project

Start the development server:
```bash
npm run start
```
The API will run on http://localhost:5000.

## Running Tests

To run unit tests for the project:
```bash
npm run test
```

The tests cover various use cases, including:

* User sign-up
* User login (email/password)
* Google login (OAuth2)
* Apple login (OAuth2)
* Post management (create, update, delete, find)

## Project Structure
```bash
.
├── src
│   ├── auth
│   │   └── passport.js              # OAuth strategies (Google, Apple)
│   ├── posts
│   │   ├── entities
│   │   ├── use-cases
│   │   ├── controllers
│   │   └── routes.js
│   ├── users
│   │   ├── entities
│   │   ├── use-cases
│   │   ├── repositories
│   │   └── routes.js
│   ├── server.js                    # Main server setup
│   └── config
│       └── database.js              # MongoDB and Redis connection
└── tests                            # Unit tests
```
This structure adheres to Clean Architecture principles, with use cases, controllers, and repositories decoupled and organized.

## Technologies

* Express.js: For building the RESTful API
* MongoDB: NoSQL database for storing user and post data
* Redis: In-memory database for caching and session management
* Passport.js: For handling OAuth2 authentication (Google, Apple)
* JWT: For generating and verifying authentication tokens
* Mongoose: For interacting with MongoDB
* Jest: For unit testing the API

Run the following command to install the necessary dependencies:
```bash
npm install passport passport-google-oauth20 passport-apple jsonwebtoken
```
