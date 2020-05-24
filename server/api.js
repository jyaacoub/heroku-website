const express = require('express');
const apiRouter = express.Router();
const morgan = require('morgan');

// apiRouter.use(morgan('tiny'));
apiRouter.use('/minions', require('./minions.js'));
apiRouter.use('/ideas', require('./ideas.js'));
apiRouter.use('/meetings', require('./meetings.js'));

module.exports = apiRouter;