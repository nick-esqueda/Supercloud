const express = require('express');
const asyncHandler = require('express-async-handler');

const { Song, User } = require('../../db/models');
const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { getTimeElapsed } = require('../../utils/utils');
const { validateLogin } = require('../../utils/validation');

const router = express.Router();

// ROUTES **********************************************************
// GET /api/songs/:songId - GET A SINGLE SONG
router.get(
  '/:songId(\\d+)',
  asyncHandler(async (req, res, next) => {
    const id = +req.params.songId;
    const song = await Song.findByPk(id, {
      include: { model: User }
    });
    // changes createdAt to "x y's ago" format
    song.dataValues.createdAt = getTimeElapsed(song.dataValues.createdAt);
    return res.json(song);
  })
)





module.exports = router;
