var createError = require('http-errors');
var express = require('express');
var path = require('path');
// const cookieParser = require('cookie-parser');
var logger = require('morgan');
var mysql = require('mysql');
var myconnection = require('express-myconnection');

var indexRouter = require('./routes/index');
// variables que creo yo
// var newDatosRouter = require('./routes/newDatos');
// var perfilRouter =  require('./routes/perfil');
// var updateRouter = require('./routes/update');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'controllers')));




// Conexion a la base de datos !!!! antes que las rutas !!!!
app.use(myconnection(mysql, {
  host: 'localhost',
  user: 'foo',
  password: 'bar',
  port: 3306,
  database: 'gym'
}, 'single'));



app.use('/', indexRouter);
// app.use('/newDatos', newDatosRouter);
// app.use('/perfil', perfilRouter);
// app.use('/update', updateRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});






module.exports = app;
