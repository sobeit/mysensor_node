process.env.TZ='JST-9';

var ENV = {
  development: {
    appId: "Change to your app ID",
    secretKey: "Change to your app secret key",
    host: "Change to application host",
    port: 3000,
    cookieSecret: "Change to your cookie secret key",
    database: "mysensor_dev",
  },

  production: {
    appId: "Change to your app ID",
    secretKey: "Change to your app secret key",
    host: "Change to application host",
    port: 80,
    cookieSecret: "Change to your cookie secret key",
    database: "Change to production database name",
  },
  test: {
    appId: "Change to your app ID",
    secretKey: "Change to your app secret key",
    host: "Change to application host",
    port: 3000,
    cookieSecret: "Change to your cookie secret key",
    database: "mysensor_test",
  }
};

var currentEnvironment = 'development';

module.exports = function(environment) {
  if(environment != undefined) {
    currentEnvironment = environment;
  }

  return ENV[currentEnvironment];
};
