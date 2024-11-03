const UserRepository = require('../../src/repositories/UserRepository');
const UserModel = require('../../src/database/UserModel'); // Adjust the import based on your structure
const mongoose = require('mongoose');

jest.mock('../../src/database/UserModel'); // Mock the User model

describe('UserRepository', () => {
    let userRepository;

    beforeEach(() => {
        userRepository = new UserRepository();
    });

    afterAll(async () => {
        await mongoose.connection.close(); // Close the connection after all tests
    });

    it('should save a user', async () => {
        const userData = { name: 'John Doe', email: 'john@example.com', password: 'password123' };
        const userInstance = new UserModel(userData);
        UserModel.mockImplementation(() => userInstance);
        userInstance.save.mockResolvedValue(userInstance); // Mock the save method

        const result = await userRepository.save(userData);

        expect(result).toEqual(userInstance);
        expect(userInstance.save).toHaveBeenCalled();
    });

    it('should find a user by ID', async () => {
        const userId = 'userId123';
        const userInstance = { id: userId, name: 'John Doe', email: 'john@example.com' };
        UserModel.findById.mockResolvedValue(userInstance); // Mock the findById method

        const result = await userRepository.findById(userId);

        expect(result).toEqual(userInstance);
        expect(UserModel.findById).toHaveBeenCalledWith(userId);
    });

    it('should find a user by email', async () => {
        const email = 'john@example.com';
        const userInstance = { id: 'userId123', name: 'John Doe', email: email };
        UserModel.findOne.mockResolvedValue(userInstance); // Mock the findOne method

        const result = await userRepository.findByEmail(email);

        expect(result).toEqual(userInstance);
        expect(UserModel.findOne).toHaveBeenCalledWith({ email });
    });

    // Test case for when the user is found and successfully deleted
    it('should delete a user by ID', async () => {
        const userId = 'userId123';
        const userInstance = { id: userId, name: 'John Doe' };

        // Mock the findById and findByIdAndDelete methods
        UserModel.findById.mockResolvedValue(userInstance);
        UserModel.findByIdAndDelete.mockResolvedValue(userInstance);

        const result = await userRepository.deleteById(userId);

        expect(result).toEqual(userInstance);
        expect(UserModel.findById).toHaveBeenCalledWith(userId);
        expect(UserModel.findByIdAndDelete).toHaveBeenCalledWith(userId);
    });

    // Test case for when the user is not found
    it('should throw an error if the user is not found for deletion', async () => {
        const userId = 'userId123';

        // Mock findById to return null, simulating user not found
        UserModel.findById.mockResolvedValue(null);

        // Expect deleteById to throw an error
        await expect(userRepository.deleteById(userId)).rejects.toThrow('User not found');
    });
});
