'use strict';

const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL:
        process.env.NODE_ENV === 'production'
          ? 'https://cse341-project2-kp3h.onrender.com/auth/google/callback'
          : 'http://localhost:8080/auth/google/callback'
    },
    (accessToken, refreshToken, profile, done) => {
      const user = {
        googleId: profile.id,
        username: profile.displayName,
        email: profile.emails[0].value
      };
      done(null, user);
    }
  )
);

// Serialize user into session
passport.serializeUser((user, done) => {
  done(null, user);
});

// Deserialize user from session
passport.deserializeUser((user, done) => {
  done(null, user);
});
