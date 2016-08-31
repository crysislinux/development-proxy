var app = new (require('express'))();
var backendApiMap = require('./config/backend-api-map');
var env = require('./config/env');

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
