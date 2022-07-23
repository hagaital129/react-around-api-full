const { NotFoundError } = require('../utils/errorHandler');

const handleNonExistPage = (req, res, next) => {
  next(new NotFoundError('please try again!'));
};

module.exports = { handleNonExistPage };
