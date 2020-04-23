function logRequestBody(req, res, next) {
    console.log("watch request body", req.body)
    if (!req.body){
    return next("no parametrs supplied")
    }
    next()
    }
    module.exports = logRequestBody