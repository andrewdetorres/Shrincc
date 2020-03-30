const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const auth = require("../../services/auth")

// Node Mailer
const nodemailer = require("nodemailer");
const hbs = require("nodemailer-express-handlebars");
const path = require('path');

// Require models
const User = require("../../model/User");
const Profile = require("../../model/Profile");
const Link = require("../../model/Link");

// Require the validation of login and sign up
const validateRegisterInput = require("../../validation/registrationValidation");
const validateLoginInput = require("../../validation/loginValidation");
const validatePasswordReset = require("../../validation/passwordResetValidation");
const validateEmailReset = require("../../validation/emailResetValidation");

module.exports = app => {

  app.get("/api/users/test", (req, res) => {
    res.json({ message: "profile works" });
  });
  //--------------------------------------------------------
  //@request  : POST
  //@route    : /api/users/register
  //@access   : Public
  //@isAdmin  : False
  //@desc     : This route is used to register a user.
  //--------------------------------------------------------

  app.post("/api/users/register", (req, res) => {
    const { errors, isValid } = validateRegisterInput(req.body);

    //Check validation
    if (!isValid) {
      return res.status(400).json(errors);
    }

    //First find out if the user exists in the database already.
    User.findOne({ email: req.body.email })
    .then(user => {
      // Return an error that email already exists
      if (user) {
        errors.email = "This email address is already taken";
        res.status(400).json(errors);
      }
      else {

        // Generate a user verfification token
        const verificationToken = jwt.sign({
          email: req.body.email,
          tempEmail: req.body.email
        }, keys.secretKey, { expiresIn: '7d' });


        // Set up nodemail
        let mailer = nodemailer.createTransport({
          host: "smtp.gmail.com",
          port: 465,
          secure: true,
          auth: {
            user: keys.emailUser,
            pass: keys.emailPass
          }
        });

        let options = {
          viewEngine: {
            extname: '.html', // handlebars extension
            layoutsDir: path.join(__dirname, './views/layouts'), // location of handlebars templates
            defaultLayout: 'index',
            viewPath: path.join(__dirname, './views/layouts'),
            partialsDir: path.join(__dirname, './views/layouts')
          },
          viewPath: path.join(__dirname, './views/layouts'),
          extName: '.html'
        }

        mailer.use('compile', hbs(options));

        // Send Email verification
        mailer.sendMail({
          from: keys.emailUser, // sender address
          to: req.body.email, // list of receivers
          subject: 'Account verification - Shrincc',
          template: 'index',
          context: {
            verificationToken : "https://shrincc.com/auth/local/verify/" + verificationToken
          },
          attachments:[
            {
              filename : 'shrincc_logo_black.png',
              path: path.join(__dirname, 'views/layouts/images/shrincc_logo_black.png'),
              cid : 'shrincc_logo_black@shrincc.com'
            },
            {
              filename : 'emailheader.png',
              path: path.join(__dirname, 'views/layouts/images/emailheader.png'),
              cid : 'emailheader@shrincc.com'
            }
          ]
        });

        //Create a new user from the data provided
        const newUser = new User({
          email: req.body.email,
          tempEmail: req.body.email,
          password: req.body.password,
          token: verificationToken
        });

        //Use Bcrypt to encrypt the password using Salt.
        bcrypt.genSalt(10, (error, salt) => {
          bcrypt.hash(newUser.password, salt, (error, hash) => {
            if (error) {
              throw error;
            }
            newUser.password = hash;
            newUser.save()
          });
        });

        // Create a payload for jwt
        const payload = {
          id: newUser.id,
          email: newUser.email,
          tempEmail: newUser.tempEmail,
          isAdmin: newUser.isAdmin,
          activated: newUser.activated,
          date: newUser.date
        };

        //Sign in token, expires in is in seconds
        jwt.sign(
          payload,
          keys.secretKey,
          { expiresIn: 3600 },
          (error, token) => {
            if(error) {
              throw error;
            }
            res.json({ token });
          }
        );
      }
    })
    .catch(errors => {
      res.status(400).json(errors);
    });
  });

  //--------------------------------------------------------
  //@request  : post
  //@route    : /auth/reset
  //@access   : Public
  //@isAdmin  : False
  //@desc     : This route is for a user to reset their password
  //--------------------------------------------------------
  app.post("/auth/reset", (req, res) => {

    console.log("CALLED auth/reset");

    User
      .findOne({ email: req.body.email })
      .then((user) => {
        if (user) {
          // Generate a user verfification token
          const verificationToken = jwt.sign({
            data: req.body.email
          }, keys.secretKey, { expiresIn: '1h' });

          // @todo - handle then & catch
          User.findOneAndUpdate(
            { email: req.body.email }, // Find token
            { 'resetToken': verificationToken }, // Update value
          ).then(user => {
            res.send(user);
          })
          .catch(error => {
            res.status(400).json(error);
          })


          // Set up nodemail
          let mailer = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
              user: keys.emailUser,
              pass: keys.emailPass
            }
          });

          let options = {
            viewEngine: {
              extname: '.html', // handlebars extension
              layoutsDir: path.join(__dirname, './views/layouts'), // location of handlebars templates
              defaultLayout: 'passwordReset',
              viewPath: path.join(__dirname, './views/layouts'),
              partialsDir: path.join(__dirname, './views/layouts')
            },
            viewPath: path.join(__dirname, './views/layouts'),
            extName: '.html'
          }

          mailer.use('compile', hbs(options));

          // Send Email verification
          mailer.sendMail({
            from: keys.emailUser, // sender address
            to: req.body.email, // list of receivers
            subject: 'Reset Password - shrincc',
            template: 'passwordReset',
            context: {
              verificationToken : "https://shrincc.com/passwordreset/confirm/" + verificationToken
            },
            attachments:[
              {
                filename : 'shrincc_logo_black.png',
                path: path.join(__dirname, 'views/layouts/images/shrincc_logo_black.png'),
                cid : 'shrincc_logo_black@shrincc.com'
              },
              {
                filename : 'emailheader.png',
                path: path.join(__dirname, 'views/layouts/images/emailheader.png'),
                cid : 'emailheader@shrincc.com'
              }
            ]
          })
          .catch(error => {
            console.log(error);
            res.status(400).json(errors);
          });
        } else {
          // Failed to find a result
          console.log(error);
          res.status(400);
        }
      })
      .catch(error => {
        console.log(error);
        res.status(400).json(errors);
      });
  });

  //--------------------------------------------------------
  //@request  : get
  //@route    : /auth/reset/verify/:resetToken
  //@access   : Public
  //@isAdmin  : False
  //@desc     : This route is for a user to verify their password reset
  //--------------------------------------------------------
  app.post("/auth/reset/verify/:resetToken", (req, res) => {
    const { errors, isValid } = validatePasswordReset(req.body);

    //Check validation
    if (!isValid) {
      return res.status(400).json(errors);
    }

    // @todo - Check token validity (expires in)
    jwt.verify(req.params.resetToken, keys.secretKey, function(error, decoded) {
      if (error) {
        errors.password = "This token is invalid, please use a new reset link";
        res.status(400).json(errors);
      }
      else {
        User.findOne({'resetToken': req.params.resetToken})
        .then((data) => {
          if (data) {
            //Use Bcrypt to encrypt the password using Salt.
            bcrypt.genSalt(10, (error, salt) => {
              bcrypt.hash(req.body.password, salt, (error, hash) => {
                if (error) {
                  throw error;
                }
                // Find the user and update
                User.findOneAndUpdate(
                  {
                    'resetToken': req.params.resetToken
                  },
                  {
                    'password': hash,
                    'resetToken': '',
                    'passwordBlock': 0
                  } // Update values
                )
                .then(data => {
                  res.send(data);
                })
                .catch(errors => {
                  errors.password = "Password reset failed. Please retry";
                  res.status(400).json(errors);
                });
              });
            });
          }
          else {
            errors.password = "Password reset failed. Please retry";
            res.status(400).json(errors);
          }
        })
        .catch(error => {
          errors.password = "This token is invalid, please use a new reset link";
          res.status(400).json(errors);
        });
      }
    });
  });

  //--------------------------------------------------------
  //@request  : POST
  //@route    : /api/users/login
  //@access   : Public
  //@isAdmin  : False
  //@desc     : This route is used to login a user.
  //--------------------------------------------------------
  app.post("/api/users/login", (req, res) => {
    const { errors, isValid } = validateLoginInput(req.body);

    //Check validation
    if (!isValid) {
      return res.status(400).json(errors);
    }

    // First find out if the user exists in the database already.
    User.findOne({ email: req.body.email })
    .then(user => {
      // Return an error that email already exists
      if (!user) {
        errors.email = "Invalid login attempt";
        res.status(400).json(errors);
      }
      else {
        User.findOne({ email: req.body.email })
        .then(user => {
          // Block user if they attempt wrong password to many times
          if (user.passwordBlock >= 3) {
            errors.password = "Password used incorrectly 3 times, please reset password using 'Forgotten Password'";
            res.status(400).json(errors);
          }
          else {
            // Compare user password with db password
            bcrypt.compare(req.body.password, user.password)
            .then(result => {
              if (result) {

                User.findOneAndUpdate(
                  { email: req.body.email }, // Find token
                  { passwordBlock : 0 } // Update value
                ).then(result => {
                  // Create payload
                  const payload = {
                    id: user.id,
                    email: user.email,
                    isAdmin: user.isAdmin,
                    activated: user.activated,
                    date: user.date
                  };

                  //Sign in token, expires in is in seconds
                  jwt.sign(
                    payload,
                    keys.secretKey,
                    { expiresIn: 3600 },
                    (error, token) => {
                      if(error) {
                        throw error;
                      }
                      res.json({ token });
                    }
                  );
                });
              }
              else {
                // If a user is not found, increment the password block
                User.findOneAndUpdate(
                  { email: req.body.email }, // Find token
                  {
                    $inc: {  //increment by 1
                      passwordBlock: 1
                    }
                  } // Update value
                ).then((data) => {
                  // If increment succesful
                  if (data) {
                    errors.email = "Invalid login attempt";
                    res.status(400).json(errors);
                  } else {
                    res.send(false);
                  }
                });
              }
            })
            .catch(error => {
              res.status(400).json(error);
            });
          }
        })
      }
    })
    .catch(errors => {
      res.status(400).json(errors);
    });
  });

  //--------------------------------------------------------
  //@request  : POST
  //@route    : /api/reset/email
  //@access   : Public
  //@isAdmin  : False
  //@desc     : This route is used to login a user.
  //--------------------------------------------------------
  app.post("/auth/reset/email", (req, res) => {
    const { errors, isValid } = validateEmailReset(req.body);
    var success;
    //Check validation
    if (!isValid) {
      return res.status(400).json(errors);
    }

    User.findOne({ email: req.body.oldEmail })
    .then(user => {

      // Generate a user verfification token
      const verificationToken = jwt.sign({
        tempEmail: req.body.newEmail
      }, keys.secretKey, { expiresIn: '7d' });

      User.findOneAndUpdate(
        { email: req.body.oldEmail }, // Find token
        {
          tempEmail: req.body.newEmail,
          token: verificationToken,
          activated: false
        } // Update value
      ).then((user) => {


        // Set up nodemail
        let mailer = nodemailer.createTransport({
          host: "smtp.gmail.com",
          port: 465,
          secure: true,
          auth: {
            user: keys.emailUser,
            pass: keys.emailPass
          }
        });

        let options = {
          viewEngine: {
            extname: '.html', // handlebars extension
            layoutsDir: path.join(__dirname, './views/layouts'), // location of handlebars templates
            defaultLayout: 'index',
            viewPath: path.join(__dirname, './views/layouts'),
            partialsDir: path.join(__dirname, './views/layouts')
          },
          viewPath: path.join(__dirname, './views/layouts'),
          extName: '.html'
        }

        mailer.use('compile', hbs(options));

        // Send Email verification
        mailer.sendMail({
          from: keys.emailUser, // sender address
          to: req.body.newEmail, // list of receivers
          subject: 'Account verification - Shrincc',
          template: 'index',
          context: {
            verificationToken : "https://shrincc.com/auth/local/verify/" + verificationToken
          },
          attachments:[
            {
              filename : 'shrincc_logo_black.png',
              path: path.join(__dirname, 'views/layouts/images/shrincc_logo_black.png'),
              cid : 'shrincc_logo_black@shrincc.com'
            },
            {
              filename : 'emailheader.png',
              path: path.join(__dirname, 'views/layouts/images/emailheader.png'),
              cid : 'emailheader@shrincc.com'
            }
          ]
        });
        res.send(user);
      })
      .catch(error => {
        errors.email = "This didn't seem to work. Please try again or contact support.";
        res.status(400).json(errors);
      });
    });
  });


  //--------------------------------------------------------
  //@request  : get
  //@route    : /auth/local/verify/:token
  //@access   : Public
  //@isAdmin  : False
  //@desc     : This route is for a user to verify email
  //--------------------------------------------------------
  app.get("/auth/local/verify/:token", async (req, res) => {
    await  jwt.verify(req.params.token, keys.secretKey, (error, decoded) => {

      console.log(decoded);
      if(error){
        res.status(401).json({ response: 'Token is not valid' });
      }
      else{
        User
        .findOneAndUpdate(
          { $and : [{'token': req.params.token}, {'tempEmail': decoded.tempEmail}]}, // Find token
          { 
            'activated': true, 
            'token': '' ,
            email: decoded.tempEmail,
            tempEmail: ''
          }) // Update value
        .then((data) => {
          if (data) {
            res.redirect('/verification?activated');
          }
          else {
            console.log(data)
            res.status(500).send('Server error');
          }
        })
        .catch(error => {
          console.log(error);
          res.status(500).send('Server error');
        });
      }
    });

  });

  //--------------------------------------------------------
  //@request  : get
  //@route    : /auth/activated
  //@access   : Public
  //@isAdmin  : False
  //@desc     : This route is for to see if a user account is activated
  //--------------------------------------------------------
  app.delete("/auth/delete", auth, (req, res) => {


    User
      .findOneAndRemove({ _id: req.user.id })
      .catch(error => {
        console.log(error);
        res.status(500).send('Server error');
      });


    Profile
      .findOneAndRemove({ user: req.user.id })
      .catch(error => {
        console.log(error);
        res.status(500).send('Server error');
      });


    Link.deleteMany({ user: req.user.id })
      .catch(error => {
        console.log(error);
        res.status(500).send('Server error');
      });

    res.json({ msg: 'User deleted' });

  });

  //--------------------------------------------------------
  //@request  : get
  //@route    : /auth/activated
  //@access   : Public
  //@isAdmin  : False
  //@desc     : This route is for to see if a user account is activated
  //--------------------------------------------------------
  app.get("/auth/activated", auth, (req, res) => {
    User
      .findById(req.user.id)
      .then(user => {
        res.json(user.activated);
      })
      .catch(error => {
        console.log(error);
        res.status(500).send('Server error');
      });
  });
}


