const express = require('express');
const asyncHandler = require('express-async-handler');

const Sequelize = require('sequelize');
const { getTimeElapsed } = require('../../utils/utils');
const Op = Sequelize.Op;
const { User, Song, Comment, Like } = require('../../db/models');
const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');
const { validateSignup } = require('../../utils/validation');

const router = express.Router();

// ROUTES ************************************************************************
// GET /api/users - GET ARTISTS
router.get(
  '/',
  asyncHandler(async (req, res) => {
    const artists = await User.findAll({
      include: { model: Song, right: true }
    })
    return res.json(artists);
  })
)

// GET /api/users/:userId - GET AN ARTIST
router.get(
  '/:userId',
  asyncHandler(async (req, res) => {
    const id = parseInt(req.params.userId, 10);
    const artist = await User.findByPk(id, {
      include: [
        { model: Song, include: [{ model: User }, { model: Comment }, { model: Like }] },
        { model: Like, include: { model: User } },
        { model: Comment, include: [{ model: User }, { model: Song }] }
      ]
    });
    artist.Comments.forEach(comment => {
      comment.dataValues.createdAt = getTimeElapsed(comment.dataValues.createdAt);
    })
    return res.json(artist);
  })
)

// POST /api/users - SIGN UP NEW USER
router.post(
  '/',
  validateSignup,
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
