const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

// const User = require('../models/User');

const GOOGLE_CALLBACK_URL = 'http://localhost:3000/home';

passport.use(
  new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: GOOGLE_CALLBACK_URL,
    passReqToCallback: true,
  }),
  async (req, accessToken, refreshToken, profile, cb) => {
    console.log(req, accessToken, refreshToken, profile, cb);
  },
);
