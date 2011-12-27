/*
 * API
 */
var SensorValue = require('../models/sensor_value');
exports.get_sensing_point_value = function(req,res) {
  SensorValue.findOfSpecificSensorValueByLoc(req.params.type,req.query.lat,req.query.lng,function(err,doc){
			    if(err){
				res.status = 404;
				res.send(err);
				return;
			    }
			    res.contentType('application/json');
			    res.send(doc);
			});
};

exports.get_specifictype_sensors_valuelist_of_point = function(req,res){
  SensorValue.findListOfSpecificSensorValueByLoc(req.params.type,req.query.lat,req.query.lng,function(err,doc){
						      if(err){
							  res.status = 404;
							  res.send(err);
							  return;
						      }
						      res.contentType('application/json');
						      res.send(doc);
						  });
};

exports.get_sensors_valuelist_of_point = function(req,res) {
  SensorValue.findListOfSensorsValueByLoc(req.query.lat,req.query.lng,function(err,doc){
					      if(err){
						  res.status = 404;
						  res.send(err);
						  return;
					      }
					      res.contentType('application/json');
					      res.send(doc);
					  });
};

exports.regist_sensor_value = function(req, res) {
  SensorValue.registValue(req.body.type, req.body.lat, req.body.lng, req.body.value, function(err){
      if(err){
        res.status = 400;
	res.send(err);
        return;
      }
      res.status = 201;
      res.send("OK!!");
  });
};

