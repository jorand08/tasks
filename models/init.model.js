const { Task } = require('../models/task.model');
const { User } = require('../models/user.model');

const initmodels = () => {
  //1User <--> M Tasks
  User.hasMany(Task, { foreignKey: 'userId' });
  Task.belongsTo(User);
};

module.exports = { initmodels };
