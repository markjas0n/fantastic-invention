// controllers/index.js

const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes');

// Use homeRoutes for main routes
router.use('/', homeRoutes);

// Use apiRoutes for API routes
router.use('/api', apiRoutes);

module.exports = router;
