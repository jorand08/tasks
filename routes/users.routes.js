const express = require('express');

//controllers
const {
  getAllUser,
  createUser,
  updateUser,
  deleteUser,
} = require('../controllers/user.controller');

//middlewares
const { userExists } = require('../middlewares/user.middleware');
const { createUserValidators } = require('../middlewares/validator.middleware');

const usersRouter = express.Router();

usersRouter.get('/', getAllUser);
usersRouter.post('/', createUserValidators, createUser);
usersRouter.patch('/:id', userExists, updateUser);
usersRouter.delete('/:id', userExists, deleteUser);

module.exports = { usersRouter };
