//import modules
const express = require('express');
const searchRouter = require('./routers/articleRouter');
const submitRouter = require('./routers/userRouter');
const cors = require('cors');

const app = express();

app.use(cors());
app.options('*', cors());

//middlewares
app.use(express.json());
app.use(express.static(`${__dirname}/public`));

app.get('/', (rep, res) => {
  res.status(200).json({
    message: 'Hello',
  });
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

app.use('/api/v1/article', searchRouter);
app.use('/api/v1/user', submitRouter);

module.exports = app;
