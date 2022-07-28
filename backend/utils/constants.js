const bcrypt = require('bcryptjs');

const DEFAULTERROR_CODE = 500;
const NOTFOUND_CODE = 404;
const VALIDATION_CODE = 400;
const UNAUTHORIZED_CODE = 401;
const UNAUTHORIZEDUSER_CODE = 403;

const SALT = 10;
const jwt = require('jsonwebtoken');

const User = require('../models/user');

require('dotenv').config();

const { JWT_SECRET, NODE_ENV, ADMIN_ID } = process.env;
module.exports = {
  ADMIN_ID,
  bcrypt,
  User,
  VALIDATION_CODE,
  DEFAULTERROR_CODE,
  SALT,
  jwt,
  NOTFOUND_CODE,
  UNAUTHORIZED_CODE,
  UNAUTHORIZEDUSER_CODE,
  JWT_SECRET,
  NODE_ENV,
};
