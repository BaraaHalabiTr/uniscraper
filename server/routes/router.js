const express = require('express');
const route = express.Router();

const services = require('../services/render');
const controller = require('../controller/controller');

/**
 *  @description Root Route
 *  @method GET /
 */
route.get('/login', services.login);

// API
route.post('/api/login', controller.login);


module.exports = route