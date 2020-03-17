// Our requirements
const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const TwitterStrategy = require('passport-twitter').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

// Model for our users
const User = mongoose.model('users');

passport.serializeUser((user, done) => {
  done(null, user.id)
});

passport.deserializeUser((id, done) => {
  User.findById(id)
  .then(user => {
    done(null, user);
  });
});

// Create a strategy for passport
passport.use(
  // Google
  new GoogleStrategy({
    clientID: keys.googleClientId,
    clientSecret: keys.googleClientSecret,
    callbackURL: 'https://shrincc.com/auth/google/callback',
  },
  async (accessToken, refreshToken, profile, done) => {
    User
      .findOne()
      .or([{ googleId: profile.id },{ email: profile._json.email }])
      .then(existingUserID => {
        // If user exists, return that user.
        if (existingUserID) {
          // If the user doesnt have a googleID, associate One
          if(!existingUserID.googleId) {
            User.findOneAndUpdate(
              {_id: existingUserID._id}, 
              {googleId: profile.id}
            )
            .then(user => {
              return done(null, user);
            })
          }
          else {
            return done(null, existingUserID);
          }
        }
        else {
          // Create new user, save them to the DB
          new User({
            googleId: profile.id,
            activated: true,
            email: profile._json.email,
            profilePicture: profile._json.picture
          })
          .save()
          .then(user => {
            done(null, user);
          });
        }
      })
  })
);

passport.use(
  // Facebook
  new TwitterStrategy({
    consumerKey: keys.twitterClientId,
    consumerSecret: keys.twitterClientSecret,
    callbackURL: "https://shrincc.com/auth/twitter/callback",
    includeEmail: true
  },
  async (accessToken, refreshToken, profile, done) => {
    User
      .findOne()
      .or([{ twitterId: profile.id },{ email: profile._json.email }])
      .then(existingUserID => {
        // If user exists, return that user.
        if (existingUserID) {
          // If the user doesnt have a TwitterID, associate One
          if(!existingUserID.twitterId) {
            User.findOneAndUpdate(
              {_id: existingUserID._id}, 
              {twitterId: profile.id}
            )
            .then(user => {
              return done(null, user);
            })
          }
          else {
            return done(null, existingUserID);
          }
        }
        else {
          // Create new user, save them to the DB
          new User({
            twitterId: profile.id,
            activated: true,
            email: profile._json.email,
            profilePicutre: profile._json.profile_image_url_https
          })
          .save()
          .then(user => {
            done(null, user);
          });
        }
      })
  })
);

passport.use(
  // Facebook
  new FacebookStrategy({
    clientID: keys.facebookClientId,
    clientSecret: keys.facebookClientSecret,
    callbackURL: "https://shrincc.com/auth/facebook/callback",
    profileFields: ['id', 'emails', 'name', 'picture.type(large)']
  },
  async (accessToken, refreshToken, profile, done) => {
    User
      .findOne()
      .or([{ facebookId: profile.id },{ email: profile._json.email }])
      .then(existingUserID => {
        // If user exists, return that user.
        if (existingUserID) {
          // If the user doesnt have a facebookID, associate One
          if(!existingUserID.facebookId) {
            User.findOneAndUpdate(
              {_id: existingUserID._id}, 
              {facebookId: profile.id}
            )
            .then(user => {
              return done(null, user);
            })
          }
          else {
            return done(null, existingUserID);
          }
        }
        else {
          // Create new user, save them to the DB
          new User({
            facebookId: profile.id,
            activated: true,
            email: profile._json.email,
            profilePicture: profile.photos[0].value
          })
          .save()
          .then(user => {
            done(null, user);
          });
        }
      })
  })
);
