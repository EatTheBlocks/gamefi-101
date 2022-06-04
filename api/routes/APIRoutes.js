'use strict';
module.exports = function(app) {

  var api = require('../controllers/APIController');
  app.get('/api/getTicketBalance',api.getTitketBalance);
  app.get('/api/getBalance',api.getBalance);
  app.get('/api/startMatch',api.startMatch);
  app.get('/api/getTop',api.getTop);
  app.post('/api/deposit',api.deposit);
  app.post('/api/withdraw',api.withdraw);
  app.post('/api/endMatch',api.endMatch);
};
