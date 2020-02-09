const jwt = require('jsonwebtoken');
const keys = require('../config/keys');

module.exports = async function(req, res, next) {
  // Get the token from the header
  if (req.header('x-auth-token')) {
    const token = req.header('x-auth-token');

    // Check to see if the token exists
    if (!token) {
      return res.status(401).json({ response: 'Authorisation denied due to no token being found.' });
    }

    try {
      await jwt.verify(token, keys.secretKey, (error, decoded) => {
        if(error){
          res.status(401).json({ response: 'Token is not valid' });
        }
        else{
          req.user = decoded;
          next();
        }
      });
    } catch (err) {
      console.error('something wrong with auth middleware');
      res.status(500).json({ response: 'Server Error' });
    }
  }
  else if (!req.user) {
    return res.status(401).send({ error: 'You must log in!' });
  }
  else {
    next();
  }
};
