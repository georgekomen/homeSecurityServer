const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const scheduledjobs = require('./service/scheduledjobs');
const indexRouter = require('./routes/index');
const actuator = require('./routes/actuator');
const app = express();
const vibroSensor = require('./sensors/vibroSensor')

mongoose.connect('mongodb+srv://root:root@cluster0-nhac8.gcp.mongodb.net/test?retryWrites=true', { useNewUrlParser: true } );
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/actuator', actuator);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.messge;
  res.locals.error = req.app.ge('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

scheduledjobs.schedulejob1();
vibroSensor.senseVibration();

module.exports = app;
