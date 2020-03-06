const mongoose = require('mongoose');
const { Schema } = mongoose;

const ProfileSchema = new Schema({
  user : {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  username: {
    type: String,
    required : true
  },
  date: {
    type: Date,
    required: true,
    default: Date.now()
  }
});

module.exports = Profile = mongoose.model('profile', ProfileSchema)