const { validationResult, check } = require('express-validator');

// (to customize, see express-validator's documentation)
const handleValidationErrors = (req, _res, next) => {
  const validationErrors = validationResult(req);

  if (!validationErrors.isEmpty()) {
    const errors = validationErrors.array().map((error) => `${error.msg}`);

    const err = Error('Bad request.');
    err.errors = errors;
    err.status = 400;
    err.title = 'Bad request.';
    next(err);
  }

  next();
};

const validateLogin = [
  check('credential')
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage('please enter your username or email'),
  check('password')
    .exists({ checkFalsy: true })
    .withMessage('please enter your password'),
  handleValidationErrors
];

const validateSignup = [
  check('email')
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage('please provide a valid email'),
  check('username')
    .exists({ checkFalsy: true })
    .isLength({ min: 4 })
    .withMessage('please provide a username with at least 4 characters'),
  check('username')
    .not()
    .isEmail()
    .withMessage('username cannot be an email'),
  check('password')
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage('password must be 6 characters or more'),
  check('bio')
    .isLength({ max: 255 })
    .withMessage('bio must be shorter than 255 characters'),
  check('location')
    .isLength({ max: 50 })
    .withMessage('location must be shorter than 50 characters'),
  handleValidationErrors
];

const validateSong = [
  check('songURL')
    .exists({ checkFalsy: true })
    .withMessage('please upload a song first')
    .isURL()
    .withMessage('your song url is not a valid url'),
  check('artworkURL')
    .isURL()
    .withMessage('your song url is not a valid url'),
  check('title')
    .exists({ checkFalsy: true })
    .withMessage('please enter a title')
    .isLength({ max: 255 })
    .withMessage('title must be shorter than 255 characters'),
  check('genre')
    .isLength({ max: 25 })
    .withMessage('genre must be shorter than 25 characters'),
  check('description')
    .isLength({ max: 500 })
    .withMessage('description must be shorter than 500 characters'),
  check('duration')
    .isLength({ max: 5 })
    .withMessage('song duration is messed up - check helper functions'),
  handleValidationErrors
];


module.exports = {
  handleValidationErrors, validateLogin, validateSignup, validateSong
};
