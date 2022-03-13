const express = require('express');
const asyncHandler = require('express-async-handler');

const { Song, User, Like, Comment } = require('../../db/models');
const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { getTimeElapsed } = require('../../utils/utils');
const { validateSong, validateSongEdit } = require('../../utils/validation');

const router = express.Router();

// ROUTES **********************************************************
// GET /api/songs/:songId - GET A SINGLE SONG
router.get(
  '/:songId(\\d+)',
  asyncHandler(async (req, res, next) => {
    const id = parseInt(req.params.songId, 10);
    const song = await Song.findByPk(id, {
      include: [
        { model: User, include: { model: Song } },
        { model: Like, include: { model: User } },
        { model: Comment, include: { model: User } },
      ]
    });
    // changes createdAt to "x y's ago" format
    song.dataValues.createdAt = getTimeElapsed(song.dataValues.createdAt);
    return res.json(song);
  })
)

// GET /api/songs - GET ALL SONGS
router.get('/', asyncHandler(async (req, res) => {
  const orderByPlays = await Song.findAll({
    include: [
      { model: User, include: { model: Song } },
      { model: Like },
      { model: Comment },
    ],
    order: [['plays', 'DESC']],
    limit: 50,
  });
  const orderByRecent = await Song.findAll({
    include: [
      { model: User, include: { model: Song } },
      { model: Like },
      { model: Comment },
    ],
    order: [['createdAt', 'DESC']],
    limit: 10
  });
  // songs.forEach(song => {
  //   song.dataValues.createdAt = getTimeElapsed(song.dataValues.createdAt);
  // });
  return res.json({ orderByPlays, orderByRecent });
}));

// POST /api/songs - CREATE A SONG
router.post(
  '/',
  requireAuth,
  validateSong,
  asyncHandler(async (req, res) => {
    const userId = req.user.id
    const createdSong = await Song.create({ ...req.body, userId });
    const song = await Song.findByPk(createdSong.id, {
      include: [{ model: User }, { model: Like }, { model: Comment }],
    })
    // changes createdAt to "x y's ago" format
    song.dataValues.createdAt = getTimeElapsed(song.dataValues.createdAt);
    return res.json(song);
  })
)

// PUT /api/songs/:songId - EDIT A SONG
router.put(
  '/:songId',
  requireAuth,
  validateSongEdit,
  asyncHandler(async (req, res) => {
    const id = parseInt(req.params.songId, 10);
    const song = await Song.findByPk(id, {
      include: [
        { model: User, include: { model: Song } },
        { model: Like },
        { model: Comment }
      ],
    });
    song.set({ ...req.body });
    await song.save();
    song.dataValues.createdAt = getTimeElapsed(song.dataValues.createdAt);
    return res.json(song);
  })
)

// DELETE /api/songs/:songId - DELETE A SONG
router.delete(
  '/:songId(\\d+)',
  requireAuth,
  asyncHandler(async (req, res) => {
    const id = parseInt(req.params.songId, 10);
    await Song.destroy({ where: { id } });
    return res.json(id);
  })
)



module.exports = router;
