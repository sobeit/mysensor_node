var app = require('../app'), 
    assert = require('assert');

module.exports = {
  'GET /': function() {
      assert.response(app,
		     {url:'/'},
		     function(res){
		        assert.includes(res.body, '<p>Welcome to Express</p>');
		     });
  },

 'GET /sensor/:type/value/point?': function() {
     assert.response(app,
		    {url:'/sensor/barometer/value/point?lat=35.653391&lng=139.761811'},
		    {status:200, headers:{'Content-Type':'application/json; charset=utf-8'}},
		    function(res){
			assert.includes(res.body,'{\"type\":"barometer","lat":35.653391,"lng":139.761811,"value":200}');
		    });
  },

  'GET /sensors/valuelist/point?': function() {
     assert.response(app,
		     {url:'/sensors/valuelist/point?lat=35.653391&lng=139.761811'},
		     {status:200,headers:{'Content-Type':'application/json; charset=utf-8'}},
		     function(res){
			 assert.includes(res.body,'{\"valuelist\":[{\"type\":"barometer","lat":35.653391,"lng":139.761811,"value":200},{\"type\":"thermometer","lat":35.653391,"lng":139.761811,"value":22.2}]}');
		     });
  }
};
