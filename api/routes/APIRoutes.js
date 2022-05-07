'use strict';
const {auth} = require('../controllers/helper');
module.exports = function(app) {

  var api = require('../controllers/APIController');
  app.get('/api/getTitketBalance',api.getTitketBalance);
  app.get('/api/getBalance',api.getBalance);
  app.post('/api/deposit',api.deposit);
  app.post('/api/withdraw',api.withdraw);
};
