const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const app = require('./app');

// Connect with mongoose
const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
  })
  .then(() => console.log('DB connection successfull!'));

// Server
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});
