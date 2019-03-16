const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const africastalking = require('../service/africastalking');
const blink = require('../actuators/blink');

router.post('/blink', function(req, res, next) {
    blink.blinkGpio(req, res);
    // req.query.name
});

router.get('/door', function(req, res, next) {
    res.status(200).json({"value": req.query.value});
});

router.get('/blink', function(req, res, next) {
    res.status(200).json({"value": req.query.value});
});

module.exports = router;
