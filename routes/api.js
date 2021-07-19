const express = require('express');
const { testApiConnection } = require('../controllers/api');

const router = express.Router();

router.route('/').get(testApiConnection);

module.exports = router;
