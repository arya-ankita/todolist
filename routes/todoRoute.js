const express = require('express');
const router = express.Router();
const authController = require('./../controllers/authController');
const todoController = require('./../controllers/todoController');

router.post('/add', authController.protect, todoController.addwork);
router.delete('/removetask', authController.protect, todoController.deletework);
router.get('/allTasks/:id', authController.protect, todoController.showTask);

module.exports = router;
