var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var africastalking = require('../Service/africastalking');

router.post('/door', function(req, res, next) {
    
    // req.query.name
});

router.get('/door', function(req, res, next) {
    res.status(200).json({"value": req.query.value});
});

module.exports = router;
