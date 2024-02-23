const express = require('express');
const { clientDomain } = require('../config');


const router = express.Router();
const apiRouter = require('./api');

router.use('/api', apiRouter);

// ROUTES ***********************************************************
router.get('/health', (req, res) => {
  return res.json({ success: true });
});

router.get('/api/csrf/restore', (req, res) => {
  res.cookie('XSRF-TOKEN', req.csrfToken(), {domain: clientDomain});
  return res.json({});
});

// TEST ROUTES ******************************************************
// router.get('/hello/world', function(req, res) {
//   res.cookie('XSRF-TOKEN', req.csrfToken());
//   res.send('Hello World!');
// });

module.exports = router;
