const express = require('express');
const router = express.Router();
const authController = require('./../controllers/authController');
const adminController = require('./../controllers/adminController');


router.delete('/deleteUser', authController.protect, authController.restrictTo('admin'), adminController.deleteUser);
router.get(
  '/allUser',
  authController.protect,
  authController.restrictTo('admin'),
  adminController.allUser
);

router.patch(
  '/updateUser/:id',
  authController.protect,
  authController.restrictTo('admin'),
  adminController.updateUser
);




module.exports = router;
