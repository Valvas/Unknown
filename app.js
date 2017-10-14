'use strict';

/**************************************************************************************************************/

const fs        = require('fs');
const mysql     = require('mysql');

/**************************************************************************************************************/

let path          = require('path');
let logger        = require('morgan');
let express       = require('express');
let bodyParser    = require('body-parser');
let favicon       = require('serve-favicon');
let cookieParser  = require('cookie-parser');

let init = require('./init/database/generation');//////////////////////////////

let formatTest    = require('./routes/test/format');
let functionsTest = require('./routes/test/functions');

let publicSubscription  = require('./routes/public/subscription');

/**************************************************************************************************************/

let json = JSON.parse(fs.readFileSync('./json/database.json'));

let connection = mysql.createConnection(
{
    host: json['host'],
    user: json['user'],
    password: json['password']
});

let salt = JSON.parse(fs.readFileSync('./json/salt.json'));

let app = express();

app.set('mysql', connection);
app.set('salt', salt['salt']);

init.createDatabases(connection, function(result, message){console.log(`${message}`);}); //////////////////////////////////////

/**************************************************************************************************************/

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Route to execute tests on the api functions.
app.use('/test/format', formatTest);
app.use('/test/functions', functionsTest);

//Public routes, does not require an authentication to call.
app.use('/public/subscription/', publicSubscription);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
