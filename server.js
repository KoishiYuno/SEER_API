/* eslint-disable no-console */
//import dependenciy modules
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const app = require('./app');

//get environmetn variables
dotenv.config({ path: 'config.env' });

//create databse connection query
const Database =
  'mongodb+srv://John:fBEzCL5IeouEkQfl@cluster0-elnh0.mongodb.net/SEER?retryWrites=true&w=majority';

//connect to MongoDB
mongoose
  .connect(Database, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log('Database connected');
  });

//create the listener
app.listen(process.env.PORT, () => {
  console.log(`App running on port ${process.env.PORT}`);
});
