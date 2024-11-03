const UserRepository = require('../../repositories/UserRepository');

class SignUp {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }

    async execute(userData) {
        const existingUser = await this.userRepository.findByEmail(userData.email);
        if (existingUser) {
            throw new Error('User already exists');
        }
        return await this.userRepository.save(userData);
    }
}

const signUp = async (req, res) => {
    const userRepository = new UserRepository();
    const signUp = new SignUp(userRepository);
    try {
        const user = await signUp.execute(req.body);
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = {
    SignUp,
    signUp
  };