const express = require('express');
const asyncHandler = require('express-async-handler');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');

const router = express.Router();

// POST /api/users - SIGN UP NEW USER
router.post(
  '/',
  asyncHandler(async (req, res, next) => {
    const {
      email, password, username, bio, location, profileImageURL, bannerImageURL,
    } = req.body;

    const user = await User.signup({
      email, password, username, bio, location, profileImageURL, bannerImageURL,
    });

    // setTokenCookie (from walk-through) is not async... need to await?
    await setTokenCookie(res, user);

    return res.json({ user });
  })
)

module.exports = router;
