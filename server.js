var app = new (require('express'))();
var httpProxy = require('http-proxy');
var querystring = require('querystring');
var delay = require('express-delay');
var frontendProxy = httpProxy.createProxyServer({
  changeOrigin: true,
  ignorePath: true,
  autoRewrite: true,
});

frontendProxy.on('error', function(err, req, res) {
  console.log(err);
  res.status(500).send('Oops, frontend proxy error');
})

var port = 10011;

app.use(delay(200, 500));

var mockAPi = {
  '/svc/verify/phone': { data: { _body: JSON.stringify({ country_code: 'US' }) } },
  '/svc/verify/zipcode': { data: { _body: JSON.stringify({ city: ['New York'], state: ['NY'], areaCode: '212', timeZone: 'E' })}},
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

var apis = [
  '/auth|http://luo-gang.luo.connect360.dev/auth',
  '/api|http://luo-gang.luo.connect360.dev/api',
  '/v0|http://luo-gang.luo.connect360.dev/v0',
  '/svc|http://luo-gang.luo.connect360.dev/svc',
]

var backendProxy = require('./proxy')(apis);

app.use(backendProxy);

app.use(function(req, res) {
  var target = 'http://localhost:4200' + req.path;
  var query = querystring.stringify(req.query);
  if (query.length > 0) {
    target += '?' + query;
  }
  // res.sendFile(__dirname + '/src/index.html');
  console.log(target);
  frontendProxy.web(req, res, { target });
});

app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(port, '0.0.0.0', function success(error) {
  if (error) {
    console.error(error);
  } else {
    console.info('==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.', port, port);
  }
});
