const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const checkObjectId = require('../../middleware/checkObjectId');
const { check, validationResult } = require('express-validator');

const Profile = require('../../models/Profile');
const Request = require('../../models/Request');
const User = require('../../models/User');

// @route    GET api/friends
// @desc     Get current user friends
// @access   Private
router.get('/', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id,
    }).populate('user', ['name', 'avatar']);

    if (!profile) {
      return res.status(400).json({ msg: 'There is no profile for this user' });
    }

    const friends = profile.friends;

    return res.json(friends);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    POST api/friends/request
// @desc     Send a friend request to a user
// @access   Private
router.post(
  '/request',
  [auth, [check('email', 'Please include a valid email').isEmail()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email } = req.body;

    try {
      const user = await User.findOne({ email }).populate('user');

      if (!user) {
        return res.status(404).json({ errors: [{ msg: 'User not found' }] });
      }

      const request = new Request({
        from: req.user.id,
        to: user.id,
      });

      await request.save();

      res.json(request);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

module.exports = router;
