
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Define the User Schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
  },
  googleId: {
    type: String,
    default: null,
  },
  appleId: {
    type: String,
    default: null,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Password hashing middleware (for email/password sign-up)
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  
  try {
    // Generate a salt and hash the password before saving the user model
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare input password with hashed password
userSchema.methods.matchPassword = async function (inputPassword) {
  return await bcrypt.compare(inputPassword, this.password);
};

// Export the User Model
const UserModel = mongoose.model('User', userSchema, 'users');
module.exports = UserModel;
