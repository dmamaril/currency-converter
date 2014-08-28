var cc           = require('currency-converter')(process.ENV.OXR_KEY);
var transactions = require('../data/transactions.js');

module.exports = function (app) {

  app.get('/', function (req, res) {
    res.redirect('/paypal/activity');
  })

  app.get('/paypal/activity', function (req, res) {
    res.render('transactions', transactions)
  });

  app.post('/paypal/currencyConversion', function (req, res) {
    var input = {};
    input.amount      = req.body.amount;
    input.convertFrom = req.body.convertFrom;
    input.convertTo   = req.body.convertTo;
    input.local       = req.body.local;

    cc.convert(input)
      .then(function (convertedCurrency) {
        res.send(200, convertedCurrency);
      })
      .catch(function (err) {
        res.send(500, "Error converting currency");
      });
  });

  app.post('/paypal/conversionRate', function (req, res) {
    var convertKey  = req.body.convertFrom + '_' + req.body.convertTo;
    var result      = {};
    var input       = {};

    input.convertFrom = req.body.convertFrom;
    input.convertTo   = req.body.convertTo;
    input.local       = req.body.local;

    cc.rates(input)
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