const express = require('express');

const mongoose = require('mongoose');

const app = express();

const helmet = require('helmet');

const bodyParser = require('body-parser');

const { errors } = require('celebrate');
const cors = require('cors');
const router = require('./routes/index');

const { limiter } = require('./helpers/limiter');

const { handleErrors } = require('./middleware/handleErrors');

const { requestLogger, errorLogger } = require('./middleware/logger');

const { NODE_ENV } = require('./utils/constants');

mongoose.connect('mongodb://localhost:27017/aroundb');

require('dotenv').config();

app.use(limiter);

app.use(bodyParser.json());

app.use(helmet());

app.disable('x-powered-by');

const { PORT = 3000 } = process.env;

app.use(cors());
app.options('*', cors());

app.use(requestLogger);

app.use('/', router);

app.use(errorLogger);

app.use(handleErrors);

router.use(errors());

if (NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`using port: ${PORT}`);
  });
}
