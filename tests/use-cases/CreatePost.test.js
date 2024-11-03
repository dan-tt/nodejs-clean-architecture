const PostRepository = require('../../src/repositories/PostRepository');
const CreatePost = require('../../src/use-cases/posts/CreatePost');

jest.mock('../../src/repositories/PostRepository');

describe('CreatePost Use Case', () => {
    let postRepository;
    let createPost;

    beforeEach(() => {
        postRepository = new PostRepository();
        createPost = new CreatePost(postRepository);
    });

    it('should create a post', async () => {
        const postData = { title: 'New Post', content: 'Post content', user: 'userId' };
        postRepository.save.mockResolvedValue(postData);

        const post = await createPost.execute(postData);
        expect(post).toEqual(postData);
        expect(postRepository.save).toHaveBeenCalledWith(postData);
    });
});
