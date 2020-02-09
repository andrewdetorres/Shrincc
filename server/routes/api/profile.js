
// Require auth user middleware
const auth = require("../../services/auth");

// Require models
const User = require("../../model/User");
const Profile = require("../../model/Profile");
const Image = require("../../model/Image");

module.exports = app => {

  //--------------------------------------------------------
  //@request  : GET
  //@route    : /api/profile/test
  //@access   : Public
  //@desc     : Test the profile public route
  //--------------------------------------------------------

  app.get("/api/profile/test", (req, res) => {
    res.json({ message: "profile works" });
  });

  //--------------------------------------------------------
  //@request  : POST
  //@route    : /api/profile
  //@access   : Private
  //@desc     : Create a new profile
  //--------------------------------------------------------

  app.post("/api/profile", auth, (req, res) => {

    // const { errors, isValid } = validateProfileInput(req.body);

    // //Check validation
    // if (!isValid) {
    //   return res.status(400).json(errors);
    // }

    // Deconstruct the request body
    const {
      firstName,
      lastName,
      role,
      website,
      location,
      username,
      bio,
      verified,
      youtube,
      twitter,
      facebook,
      linkedin,
      instagram,
      github,
      date
    } = req.body;


    // Build profile object from send body request
    const newProfile = {};

    // Required Fields
    newProfile.user = req.user.id;
    newProfile.firstName = firstName;
    newProfile.lastName = lastName;

    // Optional Fields
    if (role) newProfile.role = role;
    if (website) newProfile.website = website;
    if (location) newProfile.location = location;
    if (username) newProfile.username = username;
    if (bio) newProfile.bio = bio;
    if (verified) newProfile.verified = verified;
    if (youtube) newProfile.youtube = youtube;
    if (twitter) newProfile.twitter = twitter;
    if (facebook) newProfile.facebook = facebook;
    if (linkedin) newProfile.linkedin = linkedin;
    if (instagram) newProfile.instagram = instagram;
    if (github) newProfile.github = github;
    if (date) newProfile.date = date;



    // Using upsert option (creates new doc if no match is found):
    // upsert : true will create a new
    Profile
      .findOneAndUpdate(
        { user: req.user.id },
        { $set: newProfile },
        { new: true, upsert: true }
      )
      .then(profile => {
        res.json(profile);
      })
      .catch(error => {
        // Handle error if looged in user not found
        res.status(500).send('Server error');
      });
  });

  //--------------------------------------------------------
  //@request  : POST
  //@route    : /api/profile/username
  //@access   : Private
  //@desc     : Get the current users profile
  //--------------------------------------------------------

  app.post("/api/profile/username", auth, (req, res) => {
    Profile
      .find({
        $and: [
          {username: req.body.username}, 
          {user : {$ne: req.user.id}}
        ]
      })
      .then(profile => {
        if (profile.username) {
          res.status(400).json({username: "Username already exists"});
        }
        else {
          res.json(profile);
        }
      })
      .catch(error => {
        res.status(500).send('Server error');
      });
  });

  //--------------------------------------------------------
  //@request  : GET
  //@route    : /api/profile
  //@access   : Private
  //@desc     : Get the current users profile
  //--------------------------------------------------------

  app.get("/api/profile", auth, (req, res) => {
    Profile
      .findOne({ user: req.user.id })
      .then(profile => {
        res.json(profile);
      })
      .catch(error => {
        // Handle error if looged in user not found
        res.status(500).send('Server error');
      });
  });

  //--------------------------------------------------------
  //@request  : GET
  //@route    : /api/profile/all
  //@access   : Public
  //@desc     : Get all profiles.
  //--------------------------------------------------------

  app.get("/api/profiles/all", (req,res) => {
    Profile
      .find()
      .populate('user', ['email'])
      .then(profile => {
        res.json(profile);
      })
      .catch(error => {
        // Handle error if looged in user not found
        res.status(500).send('Server error');
      });
  })

  //--------------------------------------------------------
  //@request  : GET
  //@route    : /api/profile/:id
  //@access   : Public
  //@desc     : Get profile by id.
  //--------------------------------------------------------

  app.get("/api/profile/user/:id", (req, res) => {
    Profile
      .findOne({ user: req.params.id })
      .then(profile => {
        res.json(profile);
      })
      .catch(error => {
        // Handle error if looged in user not found
        res.status(500).send('Server error');
      });
  });

  //--------------------------------------------------------
  //@request  : PUT
  //@route    : /api/profile/follow/:user_id
  //@access   : Private
  //@desc     : Follow a specific user
  //--------------------------------------------------------
  app.put("/api/profile/follow/:followed_user_id", auth, (req, res) => {

    User.findById(req.params.followed_user_id)
      .then(user => {

        // Update the followers field in followed_user_id
        Profile.findOne({'user' : user.id})
        .then(profile => {

          const profileToBeFollowed = profile.user;
          const authUserFollowing = req.user.id;

          // Check user is not attempting to follow themselves
          if (profileToBeFollowed == authUserFollowing) {
            return res.status(400).json({msg: 'You can not follow your own account'});
          }

          // Filter through list of current followers to check if user is already there
          if (profile.followers.filter(follow => follow.user.toString() === req.user.id).length === 0) {

            // Add follow to post
            profile.followers.unshift({
              user : req.user.id,
              date: Date.now()
            });

            // Update profile by saving
            profile
              .save()
              .then(profile => {
                res.json(profile);
              })
              .catch(error => {
                return res.status(404).json({msg: 'Profile not found'});
              });
          }
          else {
            return res.status(400).json({msg: 'Profile already been followed'});
          }
        })
        .catch(error => {
          return res.status(404).json({msg: 'Profile not found'});
        });
    })
    .catch(error => {
      return res.status(404).json({msg: 'User not found'});
    });
  });

  //--------------------------------------------------------
  //@request  : PUT
  //@route    : /api/profile/updateFollowing/:followed_user_id
  //@access   : Private
  //@desc     : Follow a specific user
  //--------------------------------------------------------
  app.put("/api/profile/updateFollowing/:followed_user_id", auth, (req, res) => {

    User.findById(req.user.id)
      .then(user => {

        // Update the followers field in followed_user_id
        Profile.findOne({'user' : user.id})
        .then(profile => {

          const authUserFollowing = profile.user;
          const profileToBeFollowed = req.params.followed_user_id;

          // Check user is not attempting to follow themselves
          if (profileToBeFollowed == authUserFollowing) {
            return res.status(400).json({msg: 'You can not have your own account follow you'});
          }

          // Filter through list of current following to check if user is already there
          if (profile.following.filter(follow => follow.user.toString() === profileToBeFollowed).length === 0) {

            // Add follow to post
            profile.following.unshift({
              user : profileToBeFollowed,
              date: Date.now()
            });

            // Update profile by saving
            profile
              .save()
              .then(profile => {
                res.json(profile);
              })
              .catch(error => {
                return res.status(404).json({msg: 'Profile not found'});
              });
          }
          else {
            return res.status(400).json({msg: 'Profile already been followed'});
          }
        })
        .catch(error => {
          return res.status(404).json({msg: 'Profile not found'});
        });
    })
    .catch(error => {
      return res.status(404).json({msg: 'User not found'});
    });
  });

  //--------------------------------------------------------
  //@request  : PUT
  //@route    : /api/profile/unfollow/:user_id
  //@access   : Private
  //@desc     : Follow a specific user
  //--------------------------------------------------------
  app.put("/api/profile/unfollow/:followed_user_id", auth, (req, res) => {

    User.findById(req.params.followed_user_id)
      .then(user => {

        // Update the followers field in followed_user_id
        Profile.findOne({'user' : user.id})
        .then(profile => {

          const profileToBeFollowed = profile.user;
          const authUserFollowing = req.user.id;

          // Check user is not attempting to follow themselves
          if (profileToBeFollowed == authUserFollowing) {
            return res.status(400).json({msg: 'You can not unfollow your own account'});
          }

          // Filter through list of current followers to check if user is already there
          if (profile.followers.filter(follow => follow.user.toString() === req.user.id).length > 0) {

            // Get the remove index
            const removeIndex = profile.followers.map(follower =>
              follower.user.toString()
            ).indexOf(req.user.id);

            // Remove follower from the profile
            profile.followers.splice(removeIndex, 1);

            profile.save()
              .then(profile => {
                res.json(profile);
              })
              .catch(error => {
                // Handle error if logged in user not found
                return res.status(400).json({msg: 'Profile has not been followed yet'});
              });
          }
          else {
            return res.status(400).json({msg: 'Profile has not been followed yet'});
          }
        })
        .catch(error => {
          return res.status(404).json({msg: 'Profile not found'});
        });
    })
    .catch(error => {
      return res.status(404).json({msg: 'User not found'});
    });
  });

  //--------------------------------------------------------
  //@request  : PUT
  //@route    : /api/profile/updateUnfollowing/:followed_user_id
  //@access   : Private
  //@desc     : Follow a specific user
  //--------------------------------------------------------
  app.put("/api/profile/updateUnfollowing/:followed_user_id", auth, (req, res) => {

    User.findById(req.user.id)
      .then(user => {

        // Update the followers field in followed_user_id
        Profile.findOne({'user' : user.id})
        .then(profile => {

          const authUserFollowing = profile.user;
          const profileToBeFollowed = req.params.followed_user_id;

          // Check user is not attempting to follow themselves
          if (profileToBeFollowed == authUserFollowing) {
            return res.status(400).json({msg: 'You can not have your own account follow you'});
          }

          // Filter through list of current following to check if user is already there
          if (profile.following.filter(follow => follow.user.toString() === profileToBeFollowed).length > 0) {

            const removeIndex = profile.following.map(removeFollowing =>
              removeFollowing.user.toString()
            ).indexOf(profileToBeFollowed);

            // Remove removeFollowing from the profile
            profile.following.splice(removeIndex, 1);

            profile.save()
              .then(profile => {
                res.json(profile);
              })
              .catch(error => {
                // Handle error if logged in user not found
                return res.status(400).json({msg: 'Post has not been followed on yet'});
              });
          }
          else {
            return res.status(400).json({msg: 'Profile already been followed'});
          }
        })
        .catch(error => {
          return res.status(404).json({msg: 'Profile not found'});
        });
    })
    .catch(error => {
      return res.status(404).json({msg: 'User not found'});
    });
  });
}