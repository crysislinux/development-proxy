var express = require('express');
var router = express.Router();

var luoData = {
  data: {
    email: 'luo@blackthorn.io',
    hash: '5447021e0f806c99bac316b21444d2e9'
  }
}

var notFound = 'Invalid email address';

router.post('/auth/lookup', function(req, res) {
  if (req.body.email === luoData.data.email) {
    return res.json(luoData);
  }

  res.send(notFound);
});

module.exports = router;
