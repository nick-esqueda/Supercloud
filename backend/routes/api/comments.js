const express = require('express');
const asyncHandler = require('express-async-handler');

const { Song, User, Like, Comment } = require('../../db/models');
const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { getTimeElapsed } = require('../../utils/utils');
const { validateSong, validateSongEdit } = require('../../utils/validation');

const router = express.Router();

// ROUTES **********************************************************
// GET /api/comments - GET ALL COMMENTS
router.get(
  '/',
  asyncHandler(async (req, res) => {
    const comments = await Comment.findAll();
    return res.json(comments);
  })
)

// GET /api/comments/:songId - GET ALL OF A SONG'S COMMENTS
router.get(
  '/:songId',
  asyncHandler(async (req, res) => {
    const songId = parseInt(req.params.songId, 10);
    const comments = await Comment.findAll({ where: { songId } });
    return res.json(comments);
  })
)


module.exports = router;
