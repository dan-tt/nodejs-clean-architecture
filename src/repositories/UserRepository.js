const UserModel = require('../database/UserModel');

class UserRepository {
    async save(userData) {
        const user = new UserModel(userData);
        return await user.save();
    }

    async findById(userId) {
        return await UserModel.findById(userId);
    }

    async findByEmail(email) {
        console.log('findByEmail:', email);
        return await UserModel.findOne({ email });
    }

    async update(userId, updateData) {
        const user = await UserModel.findById(userId);
        if (!user) {
            throw new Error('User not found');
        }
        return await UserModel.findByIdAndUpdate(userId, updateData, { new: true });
    }

    async deleteById(userId) {
        const user = await UserModel.findById(userId);

        // Throw an error if the user is not found
        if (!user) {
            throw new Error('User not found');
        }

        return await UserModel.findByIdAndDelete(userId);
    }
}

module.exports = UserRepository;
