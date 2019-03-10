var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var africastalking = require('../Service/africastalking');
var blink = require('../blink');

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
