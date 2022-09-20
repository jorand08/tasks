const { User } = require('../models/user.model');
const { Task } = require('../models/task.model');

const getAllUser = async (req, res) => {
  try {
    const users = await User.findAll({
      where: { status: 'active' },
      attributes: ['id', 'name', 'email', 'status'],
      include: [{ model: Task }],
    });

    res.status(200).json({
      status: 'success',
      data: {
        users,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const newUser = await User.create({ name, email, password });

    res.status(201).json({
      status: 'sucess',
      data: { newUser },
    });
  } catch (error) {
    console.log(error);
  }
};

const updateUser = async (req, res) => {
  try {
    const { name, email } = req.body;
    const { user } = req;

    await user.update({ name, email });

    res.status(200).json({
      status: 'success',
      data: {
        user,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

const deleteUser = async (req, res) => {
  try {
    const { status } = req.body;
    const { user } = req;
    await user.update({ status: 'disabled' });

    res.status(200).json({
      status: 'sucess',
      data: { user },
    });
  } catch (error) {
    console.log(error);
  }
};
module.exports = { getAllUser, createUser, updateUser, deleteUser };
