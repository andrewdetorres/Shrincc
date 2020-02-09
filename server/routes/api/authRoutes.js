// Require the user model
const User = require("../../model/User");

const passport = require('passport');
const auth = require("../../services/auth");

module.exports = app => {

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  
  passport.deserializeUser((id, done) => {
    User.findById(id)
    .then(user => {
      done(null, user);
    });
  });
  
  //--------------------------------------------------------
  //@request  : GET
  //@route    : /auth/facebook
  //@access   : Public
  //@desc     : Forward the users request to facebook
  //--------------------------------------------------------
  app.get('/auth/facebook',
    passport.authenticate('facebook', {
      scope: ['email']
    }
  ));

  //--------------------------------------------------------
  //@request  : GET
  //@route    : /auth/instagram/callback
  //@access   : Public
  //@desc     : Use passport to authenticate user.
  //--------------------------------------------------------
  app.get('/auth/twitter/callback',
    passport.authenticate('twitter', {
      failureRedirect: '/',
      successRedirect: '/'
    })
  );

  //--------------------------------------------------------
  //@request  : GET
  //@route    : /auth/twitter
  //@access   : Public
  //@desc     : Forward the users request to twitter
  //--------------------------------------------------------
  app.get('/auth/twitter',
    passport.authenticate('twitter', {
      scope: ['email']
    }
  ));

  //--------------------------------------------------------
  //@request  : GET
  //@route    : /auth/facebook/callback
  //@access   : Public
  //@desc     : Use passport to authenticate user.
  //--------------------------------------------------------
  app.get('/auth/facebook/callback',
    passport.authenticate('facebook', {
      failureRedirect: '/',
      successRedirect: '/'
    })
  );


  //--------------------------------------------------------
  //@request  : GET
  //@route    : /auth/google
  //@access   : Public
  //@desc     : Forward the users request to google
  //--------------------------------------------------------
  app.get(
    '/auth/google',
    passport.authenticate('google', {
      scope: ['profile', 'email']
    }
  ));

  //--------------------------------------------------------
  //@request  : GET
  //@route    : /auth/google/callback
  //@access   : Public
  //@desc     : Use passport to authenticate user.
  //--------------------------------------------------------
  app.get(
    '/auth/google/callback',
    passport.authenticate('google', { 
      failureRedirect: '/',
      successRedirect: '/',
    })
  );
  //--------------------------------------------------------
  //@request  : GET
  //@route    : /api/current
  //@access   : Public
  //@desc     : Get the current logged in users details
  //--------------------------------------------------------
  app.get("/api/users/current", auth, (req, res) => {
    res.send(req.user);
  });

  //--------------------------------------------------------
  //@request  : GET
  //@route    : /api/current
  //@access   : Public
  //@desc     : Logout the current looged in user
  //--------------------------------------------------------
  app.get('/api/logout', (req, res) => {
    req.logout();
    res.redirect('/'); // Confusing redirect that means oAuth and JWT logout.
  });
};
