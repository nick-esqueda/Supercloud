const express = require('express');
const asyncHandler = require('express-async-handler');

const { Song } = require('../../db/models');
const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { validateLogin } = require('../../utils/validation');

const router = express.Router();

// ROUTES **********************************************************
// GET /api/songs/:songId - GET A SINGLE SONG
router.get(
  '/:songId(\\d+)',
  // what here?
  asyncHandler(async (req, res, next) => {
    const id = +req.params.songId;
    return res.json(id);
  })
)





module.exports = router;
