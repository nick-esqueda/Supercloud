const express = require('express');
const asyncHandler = require('express-async-handler');

const { Song, User } = require('../../db/models');
const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { getTimeElapsed } = require('../../utils/utils');
const { validateSong } = require('../../utils/validation');

const router = express.Router();

// ROUTES **********************************************************
// GET /api/songs/:songId - GET A SINGLE SONG
router.get(
  '/:songId(\\d+)',
  asyncHandler(async (req, res, next) => {
    const id = +req.params.songId;
    const song = await Song.findByPk(id, {
      include: { model: User, include: { model: Song } }
    });
    // changes createdAt to "x y's ago" format
    song.dataValues.createdAt = getTimeElapsed(song.dataValues.createdAt);
    return res.json(song);
  })
)

// GET /api/songs - GET ALL SONGS
router.get('/', asyncHandler(async (req, res) => {
  const songs = await Song.findAll({
    include: { model: User },
  });
  songs.forEach(song => {
    song.dataValues.createdAt = getTimeElapsed(song.dataValues.createdAt);
  });
  return res.json(songs);
}));

// POST /api/songs - CREATE A SONG
router.post(
  '/',
  requireAuth,
  validateSong,
  asyncHandler(async (req, res) => {
    const userId = req.user.id
    const song = await Song.create({...req.body, userId});
    // changes createdAt to "x y's ago" format
    song.dataValues.createdAt = getTimeElapsed(song.dataValues.createdAt);
    return res.json(song);
  })
)

// DELETE /api/songs/:songId - DELETE A SONG
router.delete(
  '/:songId(\\d+)',
  requireAuth,
  asyncHandler(async (req, res) => {
    const id = +req.params.songId;
    await Song.destroy({ where: { id } });
    return res.json(id);
  })
)



module.exports = router;
