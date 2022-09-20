const dotenv = require('dotenv');
const { app } = require('./app');
//utils
const { initmodels } = require('./models/init.model');
const { db } = require('./utils/database.utils');

dotenv.config({ path: './config.env' });

const startServer = async () => {
  try {
    await db.authenticate();
    initmodels();
    await db.sync();

    const PORT = 4000;
    app.listen(PORT, () => {
      console.log('express app running!');
    });
  } catch (error) {
    console.log(error);
  }
};

startServer();
