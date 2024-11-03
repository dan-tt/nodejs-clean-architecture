const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const { signToken } = require('./jwt');

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: '/auth/google/callback',
}, async (accessToken, refreshToken, profile, done) => {
  // Find or create a user in the database
  const user = await findOrCreateUser(profile);
  const token = signToken(user.id);
  done(null, { token });
}));

const googleAuth = passport.authenticate('google', { scope: ['profile', 'email'] });

module.exports = googleAuth;

