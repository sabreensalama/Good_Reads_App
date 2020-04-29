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
router.post('/login',async (req,res) => {
  const user = await userModel.findOne({"email":req.body.email}) 
  if(user){
  bcrypt.compare(req.body.password, user.password, function (err, result) {
    if (result == true) {
        
        session.email = req.body.email;
        res.statusCode = 302;
        res.setHeader("Location", "/books");
        res.send("logged in");

    } else {
      res.render('home', {locals:{
        message: 'Incorrect password'}});
    }
  });
}
else {
  res.render('home',{locals:{
    message: 'Incorrect username or password'
    
}});
 
 }
});
router.post('/signup', async (req, res) => {
  const user = new userModel(req.body);
  try {
   const tmp = await user.save();
    
   session.email = req.body.email;
   res.statusCode = 302;
   res.setHeader("Location", "/books");
    res.send("signed up");
  } catch (err) {
    if (!err.errors.email.message)
        res.render('home',{locals:{
      err: err.message     
  }});
  else
  {
    res.render('home',{locals:{
      err: err.message,
      email:err.errors.email.message
      
  }});
  }
  }
  
});
router.get('/', function(req, res) {
  res.render('home' /*,{locals: {title: 'Welcome!'}}*/);
});

module.exports = router;
