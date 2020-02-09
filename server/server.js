// Our requirements
const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const cookieSession = require('cookie-session');

// Our secret keys
const keys = require('./config/keys');
require('./model/User');
require('./services/passport');

// Let's connect to our DB
mongoose.connect(keys.mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true ,
  useFindAndModify: false
});

//Initialise app
const app = express();

// Return JSON body upon express requests
app.use(express.json({extended: false}));

// Use cookie
app.use(
  cookieSession({
    maxAge: 28 * 24 * 60 * 1000, // 4 weeks
    keys: [keys.cookie]
  })
);

// Create static folder
app.use('/uploads', express.static('uploads'));

// Init passport session
app.use(passport.initialize());
app.use(passport.session());

// Oauth routes
require('./routes/api/authRoutes')(app);
require('./routes/api/users')(app);
require('./routes/api/profile')(app);
require('./routes/api/link')(app);

// Production
if(process.env.NODE_ENV === 'production') {
  // If the server route doesn't exist, assume react route
  app.use(express.static('client/build'));
  const path = app.get('*', (req, res) => {
    res.sendfile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

// Create a single endpoint.
app.get('/', (req, res) => res.send('Api running'));

const port = process.env.PORT || 5001;

app.listen(port, () => console.log(`Server running on port ${port}`));