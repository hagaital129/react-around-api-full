const {
  User, jwt, JWT_SECRET, NODE_ENV,
} = require('../utils/constants');

const { Unauthorized, BadRequestError } = require('../utils/errorHandler');

const login = async (req, res, next) => {
  const { password, email } = req.body;

  try {
    if (!password || !email) {
      next(new BadRequestError('Bad request, please provide password and email'));
    }
    const user = await User.findUserByCredentials(email, password);

    if (user) {
      const token = await jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret', { expiresIn: 3600 });

      res.status(200).json(token);
    } else {
      next(new Unauthorized('your password or email are wrong'));
    }
  } catch (e) {
    next(new Unauthorized('your password or email are wrong'));
  }
};

module.exports = { login };
