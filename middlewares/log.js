const session = require('express-session')
function logRequestBody(req, res, next) {
    console.log("watch request body", req.body)
    if (!session.email){
        res.send("no authentication supplied");
    
    }
    next()
    }
    module.exports = logRequestBody