const passport = require('passport');
const AppleStrategy = require('passport-apple');
const { signToken } = require('./jwt');
const UserModel = require('../../database/UserModel'); // Assuming User is the Mongoose model

// Define the Apple OAuth strategy
passport.use(new AppleStrategy({
  clientID: process.env.APPLE_CLIENT_ID,             // Service ID from Apple Developer Console
  teamID: process.env.APPLE_TEAM_ID,                 // Apple Developer Team ID
  keyID: process.env.APPLE_KEY_ID,                   // Key ID from Apple Developer Console
  privateKeyString: process.env.APPLE_PRIVATE_KEY,   // Private key as string (.p8 file)
  callbackURL: '/auth/apple/callback',           // Redirect URI after successful authentication
  passReqToCallback: false,                          // Don't need the request object in callback
  scope: ['name', 'email'],
}, async (accessToken, refreshToken, profile, done) => {
  try {
    const email = profile.email;
    const name = profile.name?.firstName || 'User';
    
    // Find or create a user in the database
    let user = await UserModel.findOne({ email });
    if (!user) {
      user = new UserModel({
        name,
        email,
        appleId: profile.id
      });
      await user.save();
    }
    
    // Generate a JWT token for the authenticated user
    const token = signToken(user._id);
    done(null, { token });
  } catch (error) {
    done(error, null);
  }
}));

const appleAuth = passport.authenticate('apple', { scope: ['name', 'email'] });

module.exports = appleAuth;
