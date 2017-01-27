const express = require('express');
const router = express.Router();
const Promise = require('bluebird');

const models = require('../models');
module.exports = router;

router.get('/', function (req, res, next) {
	res.render('index', {});
});
