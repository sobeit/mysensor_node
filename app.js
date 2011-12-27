
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , api = require('./routes/api');

var app = module.exports = express.createServer();
var ENV = require('./environment')(app.settings.env);
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/' + ENV.database);

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('production', function(){
  app.use(express.errorHandler()); 
});


// Routes

app.get('/', routes.index);
app.get('/sensor/:type/value/point?',api.get_sensing_point_value);
app.get('/sensor/:type/valuelist/point?',api.get_specifictype_sensors_valuelist_of_point);
app.get('/sensors/valuelist/point?',api.get_sensors_valuelist_of_point);
app.post('/sensor/value', api.regist_sensor_value);

app.listen(3000);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
