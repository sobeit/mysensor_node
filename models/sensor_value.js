var mongoose = require('mongoose');
var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;
var SensorValue = new Schema({ 
  locId : ObjectId
 ,sensorType : String
 ,loc : {lat : Number, lng : Number}
 ,value : Number
 ,date: Date
});

mongoose.model('SensorValue', SensorValue);
SensorValue = mongoose.model('SensorValue');

SensorValue.registValue = function(type, latval, lngval, val, callback) {
  sensorvalue = new SensorValue();
  sensorvalue.sensorType = type;
  sensorvalue.loc.lat = latval;
  sensorvalue.loc.lng = lngval;
  sensorvalue.value = val;
  sensorvalue.date = new Date();
  sensorvalue.save(function(err){callback(err,sensorvalue);});
};

SensorValue.findOfSpecificSensorValueByLoc = function(type,latval,lngval,callback) {
  findByTypeAndLoc(type,latval,lngval,function(err,docs){
		       if(err) {
			   callback(err,null);
			   return;
		       }
		       callback(err,JSON.stringify(docs[0]));
		   });

};

SensorValue.findListOfSpecificSensorValueByLoc = function(type,latval,lngval,callback){
  findByTypeAndLoc(type,latval,lngval,function(err,docs){
		       if(err) {
			   callback(err,null);
			   return;
		       }
		       callback(err,JSON.stringify(docs));
		   });
};

SensorValue.findListOfSensorsValueByLoc = function(latval,lngval,callback) {
  findByLoc(latval,lngval,function(err,docs){
		if(err) {
		    callback(err,null);
		    return;
		}
		callback(err,JSON.stringify(docs));
	    });
};

function findByTypeAndLoc(type,latval,lngval,callback){
  SensorValue.find({sensorType:type, loc:{lng: new Number(lngval), lat: new Number(latval)}},
		   [],{sort:{date:-1}}, function(err,docs){
		       callback(err,docs);
		   });
};

function findByLoc(latval,lngval,callback) {
  SensorValue.find({loc:{lng: new Number(lngval), lat: new Number(latval)}},
		   [],{sort:{date:-1}}, function(err,docs){
		       callback(err,docs);
		   });
};

module.exports = SensorValue;
