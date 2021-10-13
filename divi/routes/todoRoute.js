const express = require('express');
const authController = require('../controllers/authController');
const todoController = require('../controllers/todoController');

const router = express.Router();

router.post('/add', authController.protect, todoController.addwork);
router.delete('/removetask', authController.protect, todoController.deletework);
router.get('/allTasks/:id', authController.protect, todoController.showTask);

module.exports = router;
