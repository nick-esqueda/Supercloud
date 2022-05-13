const express = require('express');
const asyncHandler = require('express-async-handler');

const { Song, User, Like, Comment } = require('../../db/models');
const { setTokenCookie, restoreUser, requireAuth, requireAuthFast } = require('../../utils/auth');
const { getTimeElapsed } = require('../../utils/utils');
const { validateSong, validateSongEdit } = require('../../utils/validation');

const router = express.Router();

// ROUTES **********************************************************
// GET /api/comments - GET ALL COMMENTS
router.get(
  '/',
  asyncHandler(async (req, res) => {
    const comments = await Comment.findAll({
      include: [{ model: User }, { model: Song }]
    });
    return res.json(comments);
  })
  )
  
  // GET /api/comments/:songId - GET ALL OF A SONG'S COMMENTS
  router.get(
  '/:songId',
  asyncHandler(async (req, res) => {
    const songId = parseInt(req.params.songId, 10);
    const comments = await Comment.findAll({
      where: { songId },
      include: [{ model: User }, { model: Song }],
      order: [['createdAt', 'DESC']]
    });
    return res.json(comments);
  })
)

// POST /api/comments - CREATE A COMMENT
router.post(
  '/',
  requireAuthFast,
  asyncHandler(async (req, res) => {
    const createdComment = await Comment.create(req.body);
    const comment = await Comment.findByPk(createdComment.id, {
      include: [{ model: User }, { model: Song }]
    });
    return res.json(comment);
  })
)

// DELETE /api/comments/:commentId - DELETE A COMMENT
router.delete(
  '/:commentId',
  requireAuthFast,
  asyncHandler(async (req, res) => {
    const id = parseInt(req.params.commentId, 10);
    const comment = await Comment.findByPk(id);
    await comment.destroy();
    return res.json(comment);
  })
)


module.exports = router;
