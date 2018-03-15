var express = require('express');
var router = express.Router();
var saleforce = require('../saleforce/saleforce');

/* GET home page. */
router.get('/', function (req, res) {

  saleforce.getAccounts().then((result) => {
    res.send(result);
  });
});

module.exports = router;
