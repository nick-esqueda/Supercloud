const express = require('express');
const asyncHandler = require('express-async-handler');

const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');

const router = express.Router();

// ROUTES **********************************************************
// POST /api/session - LOG IN USER
router.post(
  '/',
  asyncHandler(async (req, res, next) => {
    const { credential, password } = req.body;

    const user = await User.login({ credential, password });

    if (!user) {
      const err = new Error('Login failed');
      err.status = 401;
      err.title = 'Login failed';
      err.errors = ['The provided credentials were invalid.'];
      return next(err);
    }

    // setTokenCookie from the walk-through isn't async... should it be?
    // seems to work without async
    await setTokenCookie(res, user);

    return res.json({ user });
  })
);

// DELETE /api/session - LOG OUT USER
router.delete(
  '/',
  (_req, res) => {
    // if you have problems getting to this route:
    // try to add "Content-Type": "application/json" header to fetch
    res.clearCookie('token');
    return res.json({ message: 'success' });
  }
);

// GET /api/users - RESTORE USER SESSION/GET USER
router.get(
  '/',
  restoreUser,
  (req, res) => {
    const { user } = req;

    if (user) return res.json({ user: user.toSafeObject() });
    else return res.json({});
  }
);



module.exports = router;
