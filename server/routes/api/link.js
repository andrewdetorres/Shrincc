// Require auth user middleware
const auth = require("../../services/auth");

// Require models
const User = require("../../model/User");
const Link = require("../../model/Link");

module.exports = app => {

  //--------------------------------------------------------
  //@request  : GET
  //@route    : /api/profile/test
  //@access   : Public
  //@desc     : Test the profile public route
  //--------------------------------------------------------

  app.get("/api/link/test", (req, res) => {
    res.json({ message: "Link test works" });
  });

  //--------------------------------------------------------
  //@request  : POST
  //@route    : /api/link
  //@access   : Private
  //@desc     : Create a new link
  //--------------------------------------------------------
  app.post("/api/link/new", auth, (req, res) => {

    // Create new link object
    const newLink = {
      longLink: req.body.longLink,
      shortLink: generateUniqueURLKey(),
      user: req.user.id
    }

    // Create new link in DB
    new Link(newLink)
      .save()
      .then(link => {
        res.send(link);
      })
      .catch(error => {
        // Handle error if looged in user not found
        res.status(500).send('Server error');
      });
  })

  //--------------------------------------------------------
  //@request  : GET
  //@route    : /api/link/:shortLink
  //@access   : Public
  //@desc     : Get link details
  //--------------------------------------------------------
  app.get("/api/link/:shortLink", (req, res) => {

    console.log(req.params.shortLink);

    Link
      .findOne({shortLink: req.params.shortLink})
      .then(link => {
        return res.redirect(link.longLink);
      })
      .catch(error => {
        // Handle error if looged in user not found
        res.status(500).send('Server error');
      });
  })

  //--------------------------------------------------------
  //@request  : DELETE
  //@route    : /api/link/:shortLink
  //@access   : Private
  //@desc     : Delete a link
  //--------------------------------------------------------
  app.delete("/api/link/:shortLink", auth, (req, res) => {
    Link
      .findOne({shortLink: req.params.shortLink})
      .then(link => {
        console.log(link.user);
        console.log(req.user.id);
        if (link.user != req.user.id) {
          res.status(401).send('You do not own this link and therefore can not delete it');
          return;
        }
        link.remove();
        res.status(200).send('Successfully deleted link');
        return;
      })
      .catch(error => {
        // Handle error if looged in user not found
        res.status(500).send('Server error');
      });
  })

  //--------------------------------------------------------
  //@request  : POST
  //@route    : /api/click/:shortLink
  //@access   : Public
  //@desc     : Create a new click event
  //--------------------------------------------------------
  app.post("/api/click/:shortLink", (req, res) => {

    Link
      .findOne({shortLink : req.params.shortLink})
      .then(link => {
        // Add vote to link
        link.clicks.unshift({
          ip: req.body.ip,
          referrer: req.body.referrer,
          date: Date.now()
        });

        // Update link by saving
        link
          .save()
          .then(link => {
            res.json(link);
          })
          .catch(error => {
            // Handle error if logged in user not found
            res.status(500).send('Server error!');
          });
      })
      .catch(error => {
        res.status(500).send('Server error!');
      })
  })

  //--------------------------------------------------------
  //@request  : POST
  //@route    : /api/click/all/:shortLink
  //@access   : Private
  //@desc     : Get all clicks from a link
  //--------------------------------------------------------
  app.get("/api/click/all/:shortLink", auth, (req, res) => {
    Link
      .findOne({shortLink : req.params.shortLink})
      .then(link => {
        res.send(link.clicks);
      })
      .catch(error => {
        res.status(500).send('Server error!');
      })
  })

}

function generateUniqueURLKey() {
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < 7; i++ ) {
     result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  Link
    .find({shortLink: result})
    .then(link => {
      if (link) {
        generateUniqueURLKey();
      }
      else {
        return;
      }
    })
    .catch(error => {
      // Handle error if looged in user not found
      res.status(500).send('Server error');
    })

  return result;
}