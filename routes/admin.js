var express = require('express');
const userModel = require('../models/users');
const session = require('express-session')
let flash = require('connect-flash')
var router = express.Router();

router.get('/', function(req, res, next) {
    res.render('layouts/adminlogin', {layout: adminlogin});
    return;
});

module.exports = router;