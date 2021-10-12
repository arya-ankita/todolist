/* eslint-disable no-unused-expressions */
const { promisify } = require('util');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const sendEmail = require('../utils/email');

const signToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, {
  expiresIn: process.env.JWT_EXPIRES_IN
});
exports.signup = catchAsync(async (req, res) => {
 try {
    console.log("signup")
    const newUser = await User.create(req.body);
    console.log("newUser",newUser)
    const token = signToken(newUser._id);

    res.status(201).send({
      status: 'success',
      token,
      message: 'User created successfully',
      data: {
        user: newUser
      }
    });
  } catch (err) {
   console.log('Error', err);
    res.status(404).json({
      status: 'fail',
      message: err
    });
  }
});

// eslint-disable-next-line consistent-return
exports.login = catchAsync(async (req, res, next) => {
  try {
    const { email, password } = req.body;
    // 1) If email and password actually exists

    if (!email || !password) {
      return next(new AppError('Please provide email and password', 400));
    }
    // 2) Check if user exists && paqssword is correct
    const user = await User.findOne({ email }).select('+password');
    // const correct = user.correctPassword(password, user.password);

    if (!user || !(await user.correctPassword(password, user.password))) {
      return next(new AppError('Incorrect email or password', 401));
    }

    // 3) If everything ok, send token to  client
    // console.log('tt', user);
    const token = signToken(user._id);
    res.status(200).json({
      status: 'success',
      token,
      message: 'Login Successfull'
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: 'Invalid User'
    });
  }
});

// eslint-disable-next-line consistent-return
exports.protect = catchAsync(async (req, res, next) => {
  // 1) Getting token and check of it's there
  let token;
  if (
    req.headers.authorization
    && req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }
  // console.log(token);
  if (!token) {
    return next(
      new AppError('You are not logged in!., Please login to get access', 401)
    );
  }
  // 2) Verification token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  // console.log(decoded);
  // 3) Check if user still exists
  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    return next(
      new AppError('The user belonging to this token does not exist', 401)
    );
  }
  // 4) check if user changed password after the JWT was issued
  if (currentUser.changedPasswordAfter(decoded.iat)) {
    return next(new AppError(''));
  }

  req.user = currentUser;
  next();
});

// eslint-disable-next-line consistent-return
exports.restrictTo = (...roles) => (req, res, next) => {
  // roles ['admin', 'lead-guide']. role='user'
  if (!roles.includes(req.user.role)) {
    return next(
      new AppError('You do not have permission to perform this action', 403)
    );
  }
  next();
};

// eslint-disable-next-line consistent-return
exports.forgotPassword = catchAsync(async (req, res, next) => {
  // 1) Get user based on POSTED email
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new AppError('There is no user with this email', 404));
  }

  // 2) Generate the random reset token
  const resetToken = user.creactPasswordResetToken();
  await user.save({ validateBeforeSave: false });
  // 3) Send it to user's email
  const resetURL = `${req.protocol}://${req.get(
    'host'
  )}/api/v1/users/resetPassword/${resetToken}`;

  const message = ` Forgot your password? Submit a PATCH request with your new password 
    and passwordConfirm to: ${resetURL}.\nIf you didn't forget your password, please ignore this email`;

  try {
    await sendEmail({
      email: user.email,
      subject: 'Your password reset token (valid for 10 min)',
      message
    });

    res.status(200).json({
      status: 'success',
      message: 'Token sent to email!'
    });
  } catch (err) {
    // console.log('Error', err);
    // eslint-disable-next-line no-sequences
    (user.passwordResetToken = undefined),
    (user.passwordResetExpires = undefined),
    await user.save({ validateBeforeSave: false });

    return next(
      new AppError('There was an error sending the email. Try again later !')
    );
  }
});

// eslint-disable-next-line consistent-return
exports.resetPassword = catchAsync(async (req, res, next) => {
  // 1) Get user bases on the token

  const hashedToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex');

  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() }
  });
  // 2) If token has not expired, and then is user, set the new password
  if (!user) {
    return next(new AppError('Token is invalid or has expired', 400));
  }

  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;

  await user.save();
  // 3) Update changePasswordAt property for the user
  // 4) Log the user in, send JWT
  const token = signToken(user._id);
  res.status(200).json({
    status: 'success',
    token,
    message: 'Login Successfull'
  });
});
