const { Task } = require('../models/task.model');

const getAllTasks = async (req, res) => {
  try {
    const task = await Task.findAll();

    res.status(200).json({
      status: 'Success',
      data: { task },
    });
  } catch (error) {
    console.log(error);
  }
};

const getTaskStatus = async (req, res) => {
  try {
    const { status } = req.params;

    const tasks = await Task.findAll({
      where: { status },
    });

    if (
      status != 'active' &&
      status != 'completed' &&
      status != 'late' &&
      status != 'cancelled'
    ) {
      return res.status(404).json({
        status: 'error',
        message: 'status not Found',
      });
    }

    res.status(200).json({
      status: 'success',
      data: {
        tasks,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

const createTask = async (req, res) => {
  try {
    const { title, userId, startDate, limitDate } = req.body;
    const newTask = await Task.create({ title, userId, startDate, limitDate });

    res.status(201).json({
      status: 'sucess',
      data: { newTask },
    });
  } catch (error) {
    console.log(error);
  }
};

const updateTask = async (req, res) => {
  try {
    const { finishDate } = req.body;
    const { task, taskStatus } = req;

    await task.update({ finishDate });

    if (task.finishDate >= task.limitDate) {
      await task.update({ status: 'late' });
    }

    if (task.finishDate < task.limitDate) {
      await task.update({ status: 'completed' });
    }

    res.status(200).json({
      status: 'sucess',
      data: { task },
    });
  } catch (error) {
    console.log(error);
  }
};

const deleteTask = async (req, res) => {
  try {
    const { task } = req;
    await task.update({ status: 'cancelled' });

    res.status(200).json({
      status: 'sucess',
      data: { task },
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getAllTasks,
  createTask,
  getTaskStatus,
  updateTask,
  deleteTask,
};
