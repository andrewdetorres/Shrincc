const mongoose = require('mongoose');
const { Schema } = mongoose;

const LinkSchema = new Schema({
  user : {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  longLink: {
    type: String,
    required: true
  },
  shortLink: {
    type: String,
    required: true
  },
  clicks : [
    {
      ip: {
        type: String
      },
      referrer: {
        type: String
        // document.referrer
      },
      date: {
        type: Date,
        required: true,
        default: Date.now()
      },
    }
  ],
  date: {
    type: Date,
    required: true,
    default: Date.now()
  }
});

module.exports = Link = mongoose.model('link', LinkSchema)