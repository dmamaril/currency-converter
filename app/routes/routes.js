var cc           = require('currency-converter')({ CLIENTKEY: process.env.OERKEY, fetchInterval : 360000 });
var transactions = require('../data/transactions.js');

module.exports = function (app) {

  app.get('/', function (req, res) {
    res.redirect('/paypal/activity');
  })

  app.get('/paypal/activity', function (req, res) {
    res.render('transactions', transactions)
  });

  app.get('/paypal/currencyConversion', function (req, res) {
    var amount      = req.query.amount;
    var convertFrom = req.query.convertFrom;
    var convertTo   = req.query.convertTo;
    var local       = req.query.local;
    
    cc.convert(amount, convertFrom, convertTo, local)
      .then(function (convertedCurrency) {
        res.send(200, convertedCurrency);
      })
      .catch(function (err) {
        res.send(500, "Error converting currency");
      });
  });

  app.get('/paypal/conversionRate', function (req, res) {
    var result      = {};
    var convertKey  = req.query.convertFrom + '_' + req.query.convertTo;

    var convertFrom = req.query.convertFrom;
    var convertTo   = req.query.convertTo;
    var local       = req.query.local;

    cc.rates(convertFrom, convertTo, local)
      .then(function (conversionRate) {
        result[convertKey] = conversionRate;
        res.send(200, result);
      })
      .catch(function (err) {
        res.send(500, "Error calculating conversion rate.");
      });
  });

  app.get('*', function (req, res) {
    res.redirect('/paypal/activity');
  });

};