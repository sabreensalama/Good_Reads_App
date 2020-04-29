const session = require('express-session')
function logRequestBody(req, res, next) {
    console.log("watch request body", req.body)
    if (!session.email){
        res.statusCode = 302;
        res.setHeader("Location", "/");
        res.send("notlogged in")
    }
    next()
    }
    module.exports = logRequestBody