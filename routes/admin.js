var express = require('express');
var router = express.Router();


router.get('/', function(req, res,next) {
    res.render('layouts/adminlogin' ,{layout: 'adminlogin'});
  });
  
  module.exports = router;
  