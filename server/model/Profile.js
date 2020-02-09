const mongoose = require('mongoose');
const { Schema } = mongoose;

const ProfileSchema = new Schema({
  user : {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  firstName: {
    type: String,
    required : true
  },
  lastName: {
    type: String,
    required : true
  },
  username: {
    type: String,
    required : true
  },
  bio: {
    type: String
  },
  date: {
    type: Date,
    required: true,
    default: Date.now()
  }
});

module.exports = Profile = mongoose.model('profile', ProfileSchema)