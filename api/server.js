require('dotenv').config();
var cors = require('cors');
var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000,
  bodyParser = require('body-parser');
app.use(
  cors({
    origin:'*',
    methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH'],
    optionsSuccessStatus:204,
    preflightContinue:false
  })
)

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(function(req, res, next){
  req.setTimeout(1000*45, function(){
    res.status(200).json(helper.APIReturn(1, "timeout"));
  });
  next();
});

var routes = require('./routes/APIRoutes'); //importing route
routes(app); //register the route
app.listen(port);

console.log('Floppy Bird api started on: ' + port);

