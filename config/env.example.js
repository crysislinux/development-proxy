var env = {
  port: 10011, // port for proxy server
  host: '0.0.0.0', // host for proxy server
  frontendTarget: 'http://localhost:4200', // url to frontend code.
  // followings are for fakedb (json-server)
  delay: [200, 500], // delay the fake api between 200 - 500 ms randomly to emulate network latency
  fakedbPort: 10012, // port for fake api server
};

module.exports = env;
