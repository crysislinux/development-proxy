var app = new (require('express'))();
var backendApiMap = require('./config/backend-api-map');
var env = require('./config/env');

var mockAPi = {
  '/svc/verify/phone': { data: { countryCode: 'US' } },
  '/svc/verify/zipcode': { data: { city: 'New York', state: 'NY', areaCode: '212', timeZone: 'E' } },
  '/svc/verify/email': {"data":{"email":"test@test.com"}}
}

app.use(function(req, res, next) {
  var endpoints = Object.keys(mockAPi);
  for(var i = 0; i < endpoints.length; i++) {
    if (req.path.startsWith(endpoints[i])) {
      return res.json(mockAPi[endpoints[i]]);
    }
  }
  next();
});

var backendProxy = require('./proxy')(backendApiMap);
var frontendProxy = require('./proxy')([
  '|' + env.frontendTarget
])

app.use(backendProxy);
app.use(frontendProxy);


app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(env.port, env.host, function success(error) {
  if (error) {
    console.error(error);
  } else {
    console.info('==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.', env.port, env.port);
  }
});
