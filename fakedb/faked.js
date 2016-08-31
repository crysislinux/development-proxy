var shared = require('./shared');
var custom = require('./custom');

function merge(name) {
  var sharedStore = shared[name];
  var customStore = custom[name];

  var merged = {};

  Object.keys(sharedStore).forEach(key => {
    merged[key] = sharedStore[key];
  })

  Object.keys(customStore).forEach(key => {
    merged[key] = customStore[key];
  })

  return merged;
}

var db = merge('json');
var routes = merge('routes');

module.exports = {
  db,
  routes
}
