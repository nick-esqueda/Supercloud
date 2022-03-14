const express = require('express');
const asyncHandler = require('express-async-handler');

const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const { Song, User, Like, Comment } = require('../../db/models');
const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { getTimeElapsed } = require('../../utils/utils');
const { validateSong, validateSongEdit } = require('../../utils/validation');

const router = express.Router();



// SEARCH ***********************************************************************
// GET /api/search/:query - GET RESULTS FROM A SEARCH QUERY
router.get(
  '/:query',
  asyncHandler(async (req, res) => {
    const query = req.params.query;

    const results = await Song.findAll({
      where: {
        [Op.or]: [
          {
            title: { [Op.iLike]: `${query}%` }
          },
          {
            description: { [Op.iLike]: `%${query}%` }
          },
          {
            '$User.username$': { [Op.iLike]: `${query}%` }
          }
        ]
      },
      include: { model: User, },
      order: [
        ["title"],
      ],
      limit: 30
    })
    
    return res.json(results);
  })
)




module.exports = router;
