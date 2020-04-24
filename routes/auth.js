var express = require('express');
const userModel = require('../models/users');
const session = require('express-session')
var bcrypt = require('bcrypt');

var router = express.Router();
router.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}))
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
        res.end('logged in');
    } else {
     res.send('Incorrect password');
    }
  });
}
else {
  res.send('Incorrect username or password');
 }
});
router.post('/signup', async (req, res) => {
  const user = new userModel(req.body);
  try {
   const tmp = await user.save();
    res.send(tmp);
  } catch (err) {
    res.status(500).send(err);
  }
  
});

module.exports = router;
