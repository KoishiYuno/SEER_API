/* eslint-disable import/no-useless-path-segments */
/* eslint-disable no-console */
/* eslint-disable node/no-unsupported-features/es-syntax */
//import modules
const fs = require('fs');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const Reject = require('../../models/rejectedModels');

dotenv.config({ path: './config.env' });

//get database connection string
const Database = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

//connect database
mongoose
  .connect(Database, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log('Database connected'));

//Read JSON file
const articles = JSON.parse(
  fs.readFileSync(`${__dirname}/article-reject.json`, 'utf-8')
);

//import data
const importData = async () => {
  try {
    await Reject.create(articles);
    console.log('suceess impoerted');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

//empty the database
const deleteAllData = async () => {
  try {
    await Reject.deleteMany();
    console.log('suceess deleted all data from database');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteAllData();
}

console.log(process.argv);
