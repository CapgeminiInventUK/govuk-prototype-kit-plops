const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser');
const logger = require('morgan')
const nunjucks = require('nunjucks')

const indexRouter = require('./web/routes/index')

const app = express()

// configure Nunjucks with 'views' as templates directory
const viewPath = path.join(__dirname, './web/views');
nunjucks.configure(viewPath, {
  autoescape: true,
  express: app,
})

app.use(logger('dev'))
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', indexRouter)

module.exports = app
