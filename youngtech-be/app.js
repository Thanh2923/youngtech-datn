const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const router = require('./src/routes');
const sequelize = require('./src/configs/db');
const defineAssociations = require('./src/models/defineAssociations');
// const rootModel = require("./src/models")
defineAssociations();
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));

app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
app.use('/api', router);

async function syncDatabase() {
  try {
    await sequelize.sync({ force: false });
    console.log('Database synchronized');
  } catch (err) {
    console.error('Error synchronizing database:', err);
  }
}

// Gọi hàm này để đồng bộ hóa cơ sở dữ liệu
syncDatabase();
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
