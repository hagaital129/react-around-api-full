const nonExistPage = require('express').Router();

const { handleNonExistPage } = require('../controllers/notFound');

nonExistPage.get('*', handleNonExistPage);

module.exports = { nonExistPage };
