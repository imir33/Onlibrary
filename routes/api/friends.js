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

      // check if user already is friend
      // check if request already sent

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

// @route    GET api/friends/request
// @desc     Get all friend requests of current user
// @access   Private
router.get('/request', auth, async (req, res) => {
  try {
    const requests = await Request.find({ to: req.user.id });

    if (!requests) return res.status(404).json({ msg: 'No requests found' });

    res.json(requests);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    GET api/friends/request/:req_id
// @desc     Accept a friend request
// @access   Private
router.put(
  '/request/:req_id',
  [auth, checkObjectId('req_id')],
  async (req, res) => {
    try {
      const profile = await Profile.findOne({ user: req.user.id });
      if (!profile)
        return res.status(400).json({ msg: 'User does not have a profile' });

      const request = await Request.findOne({ _id: req.params.req_id });

      if (req.user.id !== request.to.toString())
        return res.status(400).json({ msg: 'Not authorized' });

      profile.friends.unshift(request.from.toString());
      await profile.save();

      const friendProfile = await Profile.findOne({
        user: request.from.toString(),
      });
      if (!friendProfile)
        return res.status(400).json({ msg: 'User does not have a profile' });

      friendProfile.friends.unshift(req.user.id.toString());
      await friendProfile.save();

      await Request.findByIdAndDelete({ _id: req.params.req_id });

      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route    DELETE api/friends/request/:req_id
// @desc     Decline friend request
// @access   Private
router.delete(
  '/request/:req_id',
  [auth, checkObjectId('req_id')],
  async (req, res) => {
    try {
      const request = await Request.findOne({ _id: req.params.req_id });
      if (!request) return res.status(404).json({ msg: 'Request not found' });

      if (req.user.id !== request.to.toString())
        return res.status(400).json({ msg: 'Not authorized' });

      await Request.findByIdAndDelete({ _id: req.params.req_id });

      res.json({ msg: 'Request declined' });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

module.exports = router;
