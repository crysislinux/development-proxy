var express = require('express');
var router = express.Router();

var phoneData = { data: { countryCode: 'US' } };

var emailData = { data : { email: 'test@test.com'}};

var zipcodeData = { data: { city: 'New York', state: 'NY', areaCode: '212', timeZone: 'E' } };

router.get('/svc/verify/phone/:phone', function(req, res) {
  res.json(phoneData);
});

router.get('/svc/verify/emailData/:email', function(req, res) {
  res.json(phoneData);
});

router.get('/svc/verify/zipcodeData/:zipcode', function(req, res) {
  res.json(phoneData);
});

module.exports = router;
