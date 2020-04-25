const express = require('express')
const mongoose = require('mongoose')
const userRouter = require('./routes/users')
const authRouter = require('./routes/auth')
const { check, validationResult } = require('express-validator');

const auth = require('./middlewares/log')

const PORT = process.env.PORT || 5000
mongoose.connect('mongodb://localhost:27017/booksys')

const app = express();
const es6Renderer = require('express-es6-template-engine');

app.engine('html', es6Renderer);
app.set('views', 'views');
app.set('view engine', 'html');

app.listen(PORT, () => console.log(`Example app listening at http://localhost:${PORT}`))

app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded())
app.use('/', authRouter)
app.use(auth)
app.use('/users', userRouter)
