const router = require('express').Router();
const { appendFile } = require('fs');
const apiRoutes = require('./api');

router.use('/api', apiRoutes);

module.exports = router;