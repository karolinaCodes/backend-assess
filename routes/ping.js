const axios = require('axios');
const express = require('express');
const router = express.Router();

router.get('/', function (req, res) {
  res.json({
    success: true,
  });
});

module.exports = router;
