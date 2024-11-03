const UserRepository = require('../../src/repositories/UserRepository');
const SignIn = require('../../src/use-cases/users/SignIn');

jest.mock('../../src/repositories/UserRepository');

require('dotenv').config();

describe('SignIn Use Case', () => {
    let userRepository;
    let signIn;

    beforeEach(() => {
        userRepository = new UserRepository();
        signIn = new SignIn(userRepository);
    });

    it('should successfully sign in a user', async () => {
        const email = 'john@example.com';
        const password = 'password123';
        const user = { email, password }; // Mock user data
        userRepository.findByEmail.mockResolvedValue(user);

        const result = await signIn.execute(email, password);
        expect(result.user).toEqual(user);
    });

    it('should throw an error if the user is not found', async () => {
        const email = 'john@example.com';
        const password = 'wrongpassword';
        userRepository.findByEmail.mockResolvedValue(null);

        await expect(signIn.execute(email, password)).rejects.toThrow('User not found');
    });
});
