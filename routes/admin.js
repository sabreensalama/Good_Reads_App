var express = require('express');
const userModel = require('../models/users');
const session = require('express-session')
let flash = require('connect-flash')
var router = express.Router();

router.get('/', (req, res) => {
    res.render('adminlogin')
    return
})


module.exports = router;