const express = require('express');
const asyncHandler = require('express-async-handler');

const { Like } = require('../../db/models');
const { setTokenCookie, restoreUser, requireAuth, requireAuthFast } = require('../../utils/auth');
const { getTimeElapsed } = require('../../utils/utils');

const router = express.Router();

// ROUTES **********************************************************
// // GET /api/likes/:userId - GET ALL OF A USER'S LIKES 
// router.get(
//   '/:userId',
//   asyncHandler(async (req, res) => {
//     const userId = parseInt(req.params.userId, 10);
//     const likes = await Like.findAll({
//       where: { userId }
//     });
    
//     likes.forEach(like => {
//       like.dataValues.createdAt = getTimeElapsed(like.dataValues.createdAt);
//     });

//     return res.json(likes);
//   })
// )


// GET /api/likes/ - GET ALL LIKES 
router.get(
  '/',
  asyncHandler(async (req, res) => {
    const likes = await Like.findAll();
    likes.forEach(like => {
      like.dataValues.createdAt = getTimeElapsed(like.dataValues.createdAt);
    });
    return res.json(likes);
  })
)

// GET /api/likes/:songId - GET ALL OF A SONG'S LIKES
router.get(
  '/:songId',
  asyncHandler(async (req, res) => {
    const songId = parseInt(req.params.songId, 10);
    const likes = await Like.findAll({
      where: { songId }
    });
    return res.json(likes);
  })
)

// POST /api/likes - CREATE A LIKE
router.post(
  '/',
  requireAuthFast,
  asyncHandler(async (req, res) => {
    const like = await Like.create(req.body);
    
    like.dataValues.createdAt = getTimeElapsed(like.dataValues.createdAt);
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
