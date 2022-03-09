const express = require('express');
const asyncHandler = require('express-async-handler');

const { Like } = require('../../db/models');
const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { getTimeElapsed } = require('../../utils/utils');

const router = express.Router();

// ROUTES **********************************************************
// GET /api/likes/:userId - GET ALL OF A USER'S LIKES 
router.get(
  '/:userId',
  asyncHandler(async (req, res) => {
    const userId = parseInt(req.params.userId, 10);
    const likes = await Like.findAll({
      where: { userId }
    });
    
    likes.forEach(like => {
      like.dataValues.createdAt = getTimeElapsed(like.dataValues.createdAt);
    });

    return res.json(likes);
  })
)

// POST /api/likes - CREATE A LIKE
router.post(
  '/',
  requireAuth,
  asyncHandler(async (req, res) => {
    const like = await Like.create(req.body);
    
    like.dataValues.createdAt = getTimeElapsed(like.dataValues.createdAt);
    return res.json(like);
  })
)

// DELETE /api/likes/:likeId - DELETE A LIKE
router.delete(
  '/:likeId',
  requireAuth,
  asyncHandler(async (req, res) => {
    const id = parseInt(req.params.likeId, 10);
    const like = await Like.findByPk(id);
    await like.destroy();
    res.json(like.songId);
  })
)


module.exports = router;
