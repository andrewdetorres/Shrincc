// Require auth user middleware
const auth = require("../../services/auth");
const DeviceDetector = require('node-device-detector');
const detector = new DeviceDetector;

// Require models
const User = require("../../model/User");
const Link = require("../../model/Link");

var scrape = require('html-metadata');

module.exports = app => {

  //--------------------------------------------------------
  //@request  : POST
  //@route    : /api/link
  //@access   : Private
  //@desc     : Create a new link
  //--------------------------------------------------------
  app.post("/api/link/new", auth, (req, res) => {

    // Scrape meta data from the long link
    scrape(req.body.longLink)
      .then((metadata) => {

        // Create new link object
        const newLink = {
          longLink: req.body.longLink,
          shortLink: generateUniqueURLKey(),
          title: metadata.general.title,
          description: metadata.general.description,
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
            console.log(error);
          });
      })
      .catch(error => {
        // If meta data scrape fails, create link without meta data.
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
            console.log(error);
          });
      });
  })


  //--------------------------------------------------------
  //@request  : GET
  //@route    : /api/click/all/
  //@access   : Private
  //@desc     : Get all links for auth user
  //--------------------------------------------------------
  app.get("/api/click/all", auth, (req, res) => {
    Link
      .find({user : req.user.id})
      .then(link => {
        res.send(link);
      })
      .catch(error => {
        res.status(500).send('Server error!');
      })
  })

  //--------------------------------------------------------
  //@request  : GET
  //@route    : /api/click/all/:shortLink
  //@access   : Private
  //@desc     : Get specific link for auth user
  //--------------------------------------------------------
  app.get("/api/click/all/:shortLink", auth, (req, res) => {
    Link
      .findOne({
        user : req.user.id,
        "shortLink" : req.params.shortLink
      })
      .then(link => {
        res.send(link);
      })
      .catch(error => {
        res.status(500).send('Server error!');
      })
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