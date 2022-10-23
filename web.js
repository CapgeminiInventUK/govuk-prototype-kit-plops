const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser');
const logger = require('morgan')
const nunjucks = require('nunjucks')

const guidancePage = require('./web/routes/guidance-page')
const indexRouter = require('./web/routes/index')

const app = express()

// configure Nunjucks with 'views' as templates directory
const viewPath = path.join(__dirname, './web/views');
const govUkPath = path.join(__dirname, './node_modules/govuk-frontend/');
nunjucks.configure([viewPath, govUkPath], {
  autoescape: true,
  express: app,
})

app.use(logger('dev'))
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/plops', guidancePage)
app.use('/', indexRouter)
app.use('/public', express.static(path.join(__dirname, '/web/public/')))
app.use('/assets', express.static(path.join(__dirname, '/node_modules/govuk-frontend/govuk/assets')))
module.exports = app
