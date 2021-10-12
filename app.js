const express = require('express');
const morgan = require('morgan');

const app = express();

// Middleware
app.use(morgan('dev'));
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
