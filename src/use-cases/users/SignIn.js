const jwt = require('../../utilities/auth/jwt');
const UserRepository = require('../../repositories/UserRepository');

class SignIn {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }

    async execute(email, password) {
        const user = await this.userRepository.findByEmail(email);
        if (!user) {
            throw new Error('User not found');
        }
        if (user.password !== password) {
            throw new Error('Invalid email or password');
        }
        const token = jwt.signToken(user._id);
        return { user, token };
    }
}

const signIn = async (req, res) => {
    const userRepository = new UserRepository();
    const signIn = new SignIn(userRepository);
    try {
        const { user, token } = await signIn.execute(req.body.email, req.body.password);
        res.status(200).json({ user, token });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

module.exports = {
    SignIn,
    signIn
  };