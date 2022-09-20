const express = require('express');

const {
  getAllTasks,
  createTask,
  getTaskStatus,
  deleteTask,
  updateTask,
} = require('../controllers/task.controller');

//middlewares
const { taskExists, taskisActive } = require('../middlewares/task.middleware');
const { createTaskValidators } = require('../middlewares/validator.middleware');
const tasksRouter = express.Router();

tasksRouter.get('/', getAllTasks);
tasksRouter.get('/:status', getTaskStatus);
tasksRouter.post('/', createTaskValidators, createTask);
tasksRouter.patch('/:id', taskExists, taskisActive, updateTask);
tasksRouter.delete('/:id', taskExists, deleteTask);

module.exports = { tasksRouter };
