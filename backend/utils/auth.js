const jwt = require('jsonwebtoken');
const { jwtConfig } = require('../config');
const { User } = require('../db/models');

const { secret, expiresIn } = jwtConfig;

// SENDING A JWT COOKIE
const setTokenCookie = (res, user) => {
  // Create the token.
  const token = jwt.sign(
    { data: user.toSafeObject() },
    secret,
    { expiresIn: parseInt(expiresIn) } // 604,800 seconds = 1 week
  );

  const isProduction = process.env.NODE_ENV === "production";

  // Set the token cookie
  res.cookie('token', token, {
    maxAge: expiresIn * 1000, // maxAge in milliseconds
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction && "Lax"
  });

  // can use this return value in routes if needed
  return token;
};

// RESTORING THE SESSION USER
const restoreUser = (req, res, next) => {
  const { token } = req.cookies;

  return jwt.verify(token, secret, null, async (err, jwtPayload) => {
    // if the JWT was tampered with, don't do anything...
    if (err) {
      return next();
    }

    // try to find a user in DB from the JWT...
    try {
      // pin the user (might not exist) on the request obj
      const { id } = jwtPayload.data;
      req.user = await User.scope('currentUser').findByPk(id);
    } catch (e) {
      // if sequelize error, delete whatever token the client had
      res.clearCookie('token');
      return next();
    }

    // if user doesn't exist in DB, delete whatever token the client had
    if (!req.user) res.clearCookie('token');

    // move on
    return next();
  });
};
// CHECKING TO SEE IF THAT SESSION USER EXISTS IN ORDER TO AUTHORIZE THEM
const requireAuth = [
  restoreUser,
  function (req, _res, next) {
    if (req.user) return next();

    const err = new Error('Unauthorized');
    err.title = 'Unauthorized';
    err.errors = ['Unauthorized'];
    err.status = 401;
    return next(err);
  }
];

module.exports = { setTokenCookie, restoreUser, requireAuth };
