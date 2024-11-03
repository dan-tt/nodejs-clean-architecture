const express = require('express');
const { signUp } = require('../use-cases/users/SignUp');
const { signIn } = require('../use-cases/users/SignIn');
const googleAuth = require('../utilities/auth/googleAuth');
const appleAuth = require('../utilities/auth/appleAuth');
const jwt = require('../utilities/auth/jwt');
const passport = require('passport');

const router = express.Router();

router.post('/sign-up', signUp);

router.post('/sign-in', signIn);

// Google sign-in route
router.post('/sign-in/google', googleAuth);

// Apple sign-in route
router.post('/sign-in/apple', appleAuth);

router.get('/auth/google/callback', passport.authenticate('google', { session: false }), (req, res) => {
    // Successful authentication, generate a JWT token and send it back.
    const token = jwt.signToken(req.user._id);
    res.status(200).json({ user: req.user, token });
});

router.get('/auth/apple/callback', passport.authenticate('apple', { session: false }), (req, res) => {
    // Successful authentication, generate a JWT token and send it back.
    const token = jwt.signToken(req.user._id);
    res.status(200).json({ user: req.user, token });
});

module.exports = router;
