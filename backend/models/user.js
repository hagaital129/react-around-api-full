const mongoose = require('mongoose');

const myVal = require('validator');

const bcrypt = require('bcryptjs');

const { Unauthorized } = require('../utils/errorHandler');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    default: 'Jacques Cousteau',
    minlength: 2,
    maxlength: 30,

  },
  about: {
    type: String,
    default: 'Explorer',
    minlength: 2,
    maxlength: 30,

  },
  avatar: {
    type: String,
    default: 'https://pictures.s3.yandex.net/resources/avatar_1604080799.jpg',
    validate: {

      validator(v) {
        return myVal.isURL(v, { require_protocol: true, allow_underscores: true });
      },

    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator(v) {
        return myVal.isEmail(v);
      },
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },

});

userSchema.statics.findUserByCredentials = async function findUserByCredentials(email, password) {
  try {
    const user = await this.findOne({ email }).select('+password');
    if (!user) {
      return Promise.reject(new Unauthorized('Incorrect email or password'));
    }
    const pasVerification = await bcrypt.compare(password, user.password);
    if (!pasVerification) {
      return Promise.reject(new Unauthorized('Incorrect email or password'));
    }

    return user;
  } catch (e) {
    return Promise.reject(new Unauthorized('Incorrect email or password'));
  }
};

module.exports = mongoose.model('user', userSchema);
