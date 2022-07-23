const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { auth } = require('../middleware/auth');

const { cardsRouter } = require('./cards');
const { usersRouter } = require('./users');
const { nonExistPage } = require('./notFound');
const { login } = require('../controllers/login');

const { createUser } = require('../controllers/createUser');

router.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Server will crash now');
  }, 0);
});

router.post('/signup', celebrate({
  body: Joi.object().keys({

    email: Joi.string().required().email(),
    password: Joi.string().required().min(6),

  }).unknown(true),
}), createUser);

router.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(6),

  }),
}), login);
router.use(auth);

router.use('/users', usersRouter);

router.use('/cards', cardsRouter);

router.use(nonExistPage);

module.exports = router;
