const UserRepository = require('../../src/repositories/UserRepository');
const SignUp = require('../../src/use-cases/users/SignUp');

jest.mock('../../src/repositories/UserRepository');

describe('SignUp Use Case', () => {
    let userRepository;
    let signUp;

    beforeEach(() => {
        userRepository = new UserRepository();
        signUp = new SignUp(userRepository);
    });

    it('should successfully sign up a user', async () => {
        const userData = { name: 'John Doe', email: 'john@example.com', password: 'password123' };
        userRepository.save.mockResolvedValue(userData);

        const user = await signUp.execute(userData);
        expect(user).toEqual(userData);
        expect(userRepository.save).toHaveBeenCalledWith(userData);
    });

    it('should throw an error if the user already exists', async () => {
        const userData = { name: 'John Doe', email: 'john@example.com', password: 'password123' };
        userRepository.findByEmail.mockResolvedValue(userData);

        await expect(signUp.execute(userData)).rejects.toThrow('User already exists');
    });
});
