const { Task } = require('../models/task.model');

const taskExists = async (req, res, next) => {
  try {
    const { id } = req.params;

    const task = await Task.findOne({ where: { id } });

    if (!task) {
      return res.status(404).json({
        status: 'error',
        message: 'Task not Found',
      });
    }

    req.task = task;
    next();
  } catch (error) {
    console.log(error);
  }
};

const taskisActive = async (req, res, next) => {
  try {
    const { id } = req.params;
    const taskStatus = await Task.findOne({
      where: { id, status: 'active' },
    });
    if (!taskStatus) {
      return res.status(404).json({
        status: 'error',
        message: 'Task not Active',
      });
    }

    req.taskStatus = taskStatus;
    next();
  } catch (error) {
    console.log(error);
  }
};
module.exports = { taskExists, taskisActive };
