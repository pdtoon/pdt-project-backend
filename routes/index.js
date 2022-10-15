const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function (_req, res, _next) {
  res.json({ "hello": "express" })
});

module.exports = router;
