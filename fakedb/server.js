var jsonServer = require('json-server')
var delay = require('express-delay');
var bodyParser = require('body-parser');
var server = jsonServer.create()

var faked = require('./faked');
var router = jsonServer.router(faked.db);
var middlewares = jsonServer.defaults()

var port = 10012;

// delay 0.5 sec to emulate network latency
server.use(delay(500));

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: false }));

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares)

Object.keys(faked.routes).forEach(key => {
  server.use('/', faked.routes[key]);
})

// Use default router
server.use(router)
server.listen(port, function (error) {
  if (error) {
    console.error(error);
  } else {
    console.info('==> 🌎  JSON Server is running on port %s', port);
  }
})
