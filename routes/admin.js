var express = require('express');
const userModel = require('../models/users');
const session = require('express-session')
let flash = require('connect-flash')
var bcrypt = require('bcrypt');

var router = express.Router();

router.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}))

router.use(flash())
router.use(session({
  genid: function(req) {
    return genuuid() // use UUIDs for session IDs
  },
  secret: 'keyboard cat'
}))
router.use(session({ secret: 'keyboard cat', cookie: { maxAge: 60000 }}))
router.post('/',async (req,res) => {
  const user = await userModel.findOne({"email":req.body.email}) 
  console.log(req.body.email);
  if(user){
  bcrypt.compare(req.body.password, user.password, function (err, result) {
    if (result == true) {
        session.id = user.id;
        res.statusCode = 302;
        res.setHeader("Location", "/admin/home");
        res.send("logged in");        
        return;
    } else {
      res.render('layouts/adminlogin', {layout: 'adminlogin'});
    }
  });
}
else {
    res.render('layouts/adminlogin', {layout: 'adminlogin'});
 }
});

router.get('/', function(req, res,next) {
    res.render('layouts/adminlogin' ,{layout: 'adminlogin'});
  });

router.get('/home', function(req, res,next) {
    res.render('layouts/adminhome' ,{layout: 'adminhome'});
  });
  

module.exports = router;
  
