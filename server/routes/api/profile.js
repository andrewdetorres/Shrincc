
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
      username,
      date
    } = req.body;


    // Build profile object from send body request
    const newProfile = {};

    // Optional Fields
    if (username) newProfile.username = username;
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
}