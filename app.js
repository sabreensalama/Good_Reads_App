const express = require('express')
const mongoose = require('mongoose')
const userRouter = require('./routes/users')
const authRouter = require('./routes/auth')
const bookRoute = require('./routes/book')
const { check, validationResult } = require('express-validator');

const auth = require('./middlewares/log')

const PORT = process.env.PORT || 5000
require('./server/config/connection');


const app = express()


app.listen(PORT, () => console.log(`Example app listening at http://localhost:${PORT}`))

app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded())
app.use('/', authRouter)
app.use(auth)
app.use('/users', userRouter)
app.use('/books',bookRoute)
