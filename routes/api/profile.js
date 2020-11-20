const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const checkObjectId = require('../../middleware/checkObjectId');
const { check, validationResult } = require('express-validator');

const Profile = require('../../models/Profile');
const User = require('../../models/User');

// @route    GET api/profile/me
// @desc     Get current users profile
// @access   Private
router.get('/me', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id,
    }).populate('user', ['name', 'avatar']);

    if (!profile) {
      return res.status(400).json({ msg: 'There is no profile for this user' });
    }

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    POST api/profile
// @desc     Create or update user profile
// @access   Private
router.post(
  '/',
  auth,
  check('genres', 'Genres is required').not().isEmpty(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { location, genres, bio, facebook, instagram } = req.body;

    const profileFields = {};
    profileFields.user = req.user.id;
    if (location) profileFields.location = location;
    if (genres) {
      profileFields.genres = genres.split(',').map((skill) => skill.trim());
    }
    if (bio) profileFields.bio = bio;

    profileFields.social = {};
    if (facebook) profileFields.social.facebook = facebook;
    if (instagram) profileFields.social.instagram = instagram;

    try {
      let profile = await Profile.findOne({ user: req.user.id });

      if (profile) {
        // update
        profile = await Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        );

        return res.json(profile);
      }

      // create
      profile = new Profile(profileFields);

      await profile.save();
      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route    GET api/profile
// @desc     Get all profiles
// @access   Public
router.get('/', async (req, res) => {
  try {
    const profiles = await Profile.find().populate('user', ['name', 'avatar']);
    res.json(profiles);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    GET api/profile/user/:user_id
// @desc     Get profile by user ID
// @access   Public
router.get('/user/:user_id', checkObjectId('user_id'), async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.params.user_id,
    }).populate('user', ['name', 'avatar']);

    if (!profile) return res.status(400).json({ msg: 'Profile not found' });

    return res.json(profile);
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ msg: 'Server error' });
  }
});

// @route    DELETE api/profile
// @desc     Delete profile & user
// @access   Private
router.delete('/', auth, async (req, res) => {
  try {
    // Remove profile
    await Profile.findOneAndRemove({ user: req.user.id });
    // Remove user
    await User.findOneAndRemove({ _id: req.user.id });

    res.json({ msg: 'User deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    PUT api/profile/book
// @desc     Add a book to the profile
// @access   Private
router.put(
  '/book',
  [
    auth,
    [
      check('title', 'Title is required').not().isEmpty(),
      check('author', 'Author is required').not().isEmpty(),
      check('numberOfPages', 'The number of pages is required').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      title,
      author,
      numberOfPages,
      currentPage,
      finished,
      from,
      to,
      rating,
    } = req.body;

    let newBook;

    if (finished) {
      newBook = {
        title: title,
        author: author,
        numberOfPages: Number.parseInt(numberOfPages),
        currentPage: Number.parseInt(numberOfPages),
        finished: true,
        rating: Number.parseInt(rating),
        from: from,
        to: to,
      };
    } else {
      newBook = {
        title: title,
        author: author,
        numberOfPages: Number.parseInt(numberOfPages),
        currentPage: Number.parseInt(currentPage),
        finished: false,
        from: from,
      };
    }

    try {
      const profile = await Profile.findOne({ user: req.user.id });

      profile.books.unshift(newBook);

      await profile.save();

      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route    PUT api/profile/book/:book_id
// @desc     Edit a book by id
// @access   Private
router.put(
  '/book/:book_id',
  [
    [auth, checkObjectId('book_id')],
    [
      check('title', 'Title is required').not().isEmpty(),
      check('author', 'Author is required').not().isEmpty(),
      check('numberOfPages', 'The number of pages is required').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      title,
      author,
      numberOfPages,
      currentPage,
      finished,
      from,
      to,
      rating,
    } = req.body;

    let newBook;

    if (finished) {
      newBook = {
        title: title,
        author: author,
        numberOfPages: Number.parseInt(numberOfPages),
        currentPage: Number.parseInt(numberOfPages),
        finished: true,
        rating: Number.parseInt(rating),
        from: from,
        to: to,
      };
    } else {
      newBook = {
        title: title,
        author: author,
        numberOfPages: Number.parseInt(numberOfPages),
        currentPage: Number.parseInt(currentPage),
        finished: false,
        from: from,
      };
    }

    try {
      const profile = await Profile.findOne({ user: req.user.id });

      profile.books = profile.books.filter(
        (book) => book._id.toString() !== req.params.book_id
      );

      profile.books.unshift(newBook);

      await profile.save();

      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route    DELETE api/profile/book/:book_id
// @desc     Delete book from profile
// @access   Private

router.delete(
  '/book/:book_id',
  [auth, checkObjectId('book_id')],
  async (req, res) => {
    try {
      const profile = await Profile.findOne({ user: req.user.id });

      profile.books = profile.books.filter(
        (book) => book._id.toString() !== req.params.book_id
      );

      await profile.save();
      return res.status(200).json(profile);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ msg: 'Server error' });
    }
  }
);

// @route    GET api/profile/book/:book_id
// @desc     Get a book by id
// @access   Private

router.get(
  '/book/:book_id',
  [auth, checkObjectId('book_id')],
  async (req, res) => {
    try {
      const profile = await Profile.findOne({ user: req.user.id });

      const book = profile.books.filter(
        (book) => book._id.toString() === req.params.book_id
      );

      return res.status(200).json(book[0]);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ msg: 'Server error' });
    }
  }
);

module.exports = router;
