const apiHandler = require('../service/testing.js');

module.exports = function routes(app) {
  app.get('/api', apiHandler);
};


