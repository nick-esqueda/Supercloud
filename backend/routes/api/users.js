const express = require('express');
const asyncHandler = require('express-async-handler');

const Sequelize = require('sequelize');
const { getTimeElapsed } = require('../../utils/utils');
const Op = Sequelize.Op;
const { User, Song, Comment, Like } = require('../../db/models');
const { setTokenCookie } = require('../../utils/auth');
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
  '/:userId(\\d+)',
  asyncHandler(async (req, res) => {
    const id = parseInt(req.params.userId, 10);
    const artist = await User.findByPk(id, {
      include: [
        { model: Song, include: [{ model: User }, { model: Comment }, { model: Like }] },
        { model: Like },
        { model: Comment, include: [{ model: User }, { model: Song }] }
      ],
      order: [[{ model: Comment }, "createdAt", "DESC"]]
    });
    artist.Comments.forEach(comment => {
      comment.dataValues.createdAt = getTimeElapsed(comment.dataValues.createdAt);
    })
    return res.json(artist);
  })
)

// GET /api/users/:userId/songs - GET AN ARTIST'S SONGS
router.get(
  '/:userId/songs',
  asyncHandler(async (req, res) => {
    const userId = parseInt(req.params.userId, 10);
    const songs = await Song.findAll({
      where: { userId },
      include: [
        { model: User },
        { model: Like },
        { model: Comment },
      ],
      order: [["createdAt", "DESC"]]
    })

    return res.json(songs);
  })
)

// GET /api/users/:userId/likes - GET A ARTIST'S LIKED SONGS
router.get(
  '/:userId/likes',
  asyncHandler(async (req, res) => {
    const userId = parseInt(req.params.userId, 10);

    const likes = await Like.findAll({
      where: { userId },
      include: [{ model: Song, include: [
        { model: User },
        { model: Like },
        { model: Comment },
      ], }]
    });
    
    const songs = likes.map(like => like.Song);
    
    return res.json(songs);
  })
)


// GET api/users/:userId/likes - GET A USER'S LIKES
router.get(
  '/:userId(\\d+)/likes',
  asyncHandler(async (req, res) => {
    const userId = parseInt(req.params.userId, 10);
    const likes = await Like.findAll({
      where: { userId },
      include: [{ model: Song, include: [{ model: User }, { model: Like }] }],
      order: [["createdAt", "DESC"]]
    })

    return res.json(likes);
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

    await setTokenCookie(res, user);

    return res.json({ user });
  })
)

module.exports = router;
