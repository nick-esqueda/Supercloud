const express = require('express');
const asyncHandler = require('express-async-handler');

const { Like } = require('../../db/models');
const { requireAuthFast } = require('../../utils/auth');

const router = express.Router();

// ROUTES **********************************************************
// POST /api/likes - CREATE A LIKE
router.post(
  '/',
  requireAuthFast,
  asyncHandler(async (req, res) => {
    const like = await Like.create(req.body);
    return res.json(like);
  })
)

// DELETE /api/likes/:userId/:songId - DELETE A LIKE
router.delete(
  '/:userId/:songId',
  requireAuthFast,
  asyncHandler(async (req, res) => {
    const userId = parseInt(req.params.userId, 10);
    const songId = parseInt(req.params.songId, 10);
    const like = await Like.findOne({
      where: { userId, songId }
    })
    await like.destroy();
    return res.json(like);
  })
)


module.exports = router;
