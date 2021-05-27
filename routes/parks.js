const express = require('express');
const { getParks } = require('../controllers/parks');

const router = express.Router();

router.route('/test').get(getParks);

module.exports = router;
