const express = require('express');
const morgan = require('morgan');
const winston = require('winston');
 
const app = express();

// Middleware
app.use(morgan('dev'));
const category1 = winston.loggers.get('category1');
const category2 = winston.loggers.get('category2');
 
category1.info('logging to file and console transports');
category2.info('logging to http transport');
app.use(express.json());
const authRouter = require('./routes/authRoute');
const todoRouter = require('./routes/todoRoute');
const adminRouter = require('./routes/adminRoute');

app.use((req, res, next) => {
  // console.log('Hello I am middleware');
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// Routes
// User Routes
app.use('/user', authRouter);

// TODOlist Routes
app.use('/list', todoRouter);

// Admin Route
app.use('/admin', adminRouter);

module.exports = app;
