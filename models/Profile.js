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
      nubmerOfPages: {
        type: String,
      },
      currentPage: {
        type: Number,
        default: 0,
      },
      finished: {
        type: Boolean,
        default: false,
        required: true,
      },
      from: {
        type: Date,
        default: Date.now,
        required: true,
      },
      to: {
        type: Date,
      },
      rating: {
        type: Number,
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
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);
