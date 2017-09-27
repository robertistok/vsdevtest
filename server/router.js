const express = require('express');

const Controller = require('./controller');

const router = express.Router();

const apiURL = '/vsdev/api';

router.get(`${apiURL}/:item`, Controller.getItem);

module.exports = router;
