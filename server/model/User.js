const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
  email: {
    type: String
  },
  password: {
    type: String
  },
  facebookId: {
    type: String
  },
  googleId: {
    type: String
  },
  twitterId: {
    type: String
  },
  profilePicture: {
    type: String
  },
  activated: {
    type: Boolean,
    default: false
  },
  isAdmin: {
    type: Boolean,
    default: false
  },
  token: {
    type: String,
    default: ''
  },
  resetToken: {
    type: String,
    default: ''
  },
  passwordBlock: {
    type: Number,
    default: 0
  },
  tempEmail: {
    type: String,
    default: ''
  },
  date: {
    type: Date,
    required: true,
    default: Date.now()
  },
});

//Export the Schema and set it to the variable User
module.exports = User = mongoose.model("users", UserSchema);