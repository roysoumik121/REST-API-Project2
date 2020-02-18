var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var newsRoutes = require('./routes/news.js');
const mongoose = require('mongoose')

var app = express();


//  Database(mongoDB) connection
mongoose
  .connect("mongodb://localhost/news", { useUnifiedTopology:true, useNewUrlParser: true})
  .then(()=>{ console.log("Connected to db")})
  .catch(err => console.log("Refused to connect: "+err));


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/news', newsRoutes);

// Error handling middleware
app.use((err, req, res, next)=>{
  res.status(422).send({error: err.message});
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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
