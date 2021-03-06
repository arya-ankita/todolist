const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = require('./app');
const logger = require('./logger');

dotenv.config({ path: './config.env' });

// Connect with mongoose
const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true
  })
  .then(()=>logger.info("Database Connected"));

// Server
const port = process.env.PORT || 3000;

app.listen(port, () => {
  logger.info(`App is running on port ${port}`);
});
