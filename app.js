require('colors');

const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const { connectDb } = require('./config');
const { HttpError } = require('./helpers');

connectDb();
const { apiRouter } = require('./routes');

const app = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.use('/api/auth', apiRouter.authRouter);
app.use('/api/users', apiRouter.userRouter);
app.use('/api/contacts', apiRouter.contactsRouter);

app.use((_, res) => {
  throw HttpError(404);
});

app.use((err, req, res, next) => {
  const { status = 500, message = 'Server error' } = err;
  res.status(status).json({ code: status, message });
});

module.exports = app;
