const handleErrors = (err, req, res, next) => {
  if (err.statusCode && err.message) {
    res.status(err.statusCode).send({ message: err.message });
    next();
    return;
  }

  res.status(500).send({ message: `something is wrong with the server  ${err.message}` });

  next();
};

module.exports = { handleErrors };
