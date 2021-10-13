const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
  task: {
    type: String,
    required: [true, 'Please tell us your work!']
  },
  userId: {
    type: String
  },
  status: {
    type: String
  },
  createdAt: {
    type: String,
    default: Date.now()
  }
});

const TodoList = mongoose.model('TodoList', todoSchema);

module.exports = TodoList;
