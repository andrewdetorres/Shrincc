// Require auth user middleware
const auth = require("../../services/auth");
const DeviceDetector = require('node-device-detector');
const detector = new DeviceDetector;

// Require models
const User = require("../../model/User");
const Link = require("../../model/Link");

// Get IP Address
var ip = require("ip");
// console.dir ( ip.address() );
var scrape = require('html-metadata');

const requestIp = require('request-ip');

// inside middleware handler
const ipMiddleware = function(req, res, next) {
  const clientIp = requestIp.getClientIp(req); 
  console.log("IP", clientIp);
  next();
};

module.exports = app => {

  //--------------------------------------------------------
  //@request  : GET
  //@route    : /api/profile/test
  //@access   : Public
  //@desc     : Test the profile public route
  //--------------------------------------------------------

  app.get("/api/link/test", (req, res) => {
    var url = "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find";
    scrape(url)
      .then((metadata) => {
        const {icons} = metadata.general;
        console.log("title",metadata.general.title);
        console.log("description",metadata.general.description);
      })
      .catch(error => {
        console.log(error);
      });
      res.json({ message: "Link test works" });
  });

  //--------------------------------------------------------
  //@request  : POST
  //@route    : /api/link
  //@access   : Private
  //@desc     : Create a new link
  //--------------------------------------------------------
  app.post("/api/link/new", auth, (req, res) => {

    console.log(req.body);
    scrape(req.body.longLink)
      .then((metadata) => {
        console.log(metadata.general);
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
            console.log(link);
            res.send(link);
          })
          .catch(error => {
            // Handle error if looged in user not found
            res.status(500).send('Server error');
            console.log(error);
          });
      })
      .catch(error => {
        const newLink = {
          longLink: req.body.longLink,
          shortLink: generateUniqueURLKey(),
          user: req.user.id
        }

        // Create new link in DB
        new Link(newLink)
          .save()
          .then(link => {
            console.log(link);
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
  //@desc     : Get all clicks from a link
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
  //@desc     : Get specific link
  //--------------------------------------------------------
  app.get("/api/click/all/:shortLink", auth, (req, res) => {
    Link
      .findOne({"shortLink" : req.params.shortLink})
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