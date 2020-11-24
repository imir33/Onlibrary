const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  location: {
    type: String,
  },
  genres: {
    type: [String],
    required: true,
  },
  bio: {
    type: String,
  },
  books: [
    {
      title: {
        type: String,
        required: true,
      },
      author: {
        type: String,
        required: true,
      },
      numberOfPages: {
        type: String,
        required: true,
      },
      currentPage: {
        type: Number,
        default: 0,
      },
      finished: {
        type: Boolean,
        default: false,
      },
      from: {
        type: Date,
        default: Date.now,
      },
      to: {
        type: Date,
      },
      rating: {
        type: Number,
        default: 5,
        min: 1,
        max: 5,
      },
    },
  ],
  social: {
    facebook: {
      type: String,
    },
    instagram: {
      type: String,
    },
  },
  friends: [
    {
      id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
      },
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);
