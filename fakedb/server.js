var jsonServer = require('json-server')
var delay = require('express-delay');
var bodyParser = require('body-parser');
var server = jsonServer.create()

var faked = require('./faked');
var router = jsonServer.router(faked.db);
var middlewares = jsonServer.defaults()
var env = require('../config/env');

// delay 0.5 sec to emulate network latency
var delayInSec = env.delay || [200, 500];
var preparedDelay = typeof delayInSec === 'number' ? delay(delayInSec) : delay.apply(delay, env.delay)
server.use(preparedDelay);

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: false }));

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares)

Object.keys(faked.routes).forEach(key => {
  server.use('/', faked.routes[key]);
})

// Use default router
server.use(router)
server.listen(env.fakedbPort, function (error) {
  if (error) {
    console.error(error);
  } else {
    console.info('==> 🌎  JSON Server is running on port %s', env.fakedbPort);
  }
})
