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

    if (cc.verifyInput(input)) {
      cc.convert(input)
        .then(function (convertedCurrency) {
          res.send(200, convertedCurrency);
        })
        .catch(function (err) {
          res.send(500, "Error converting currency");
        });
    } else {
      res.send(400, "Invalid input");
    }
  });

  app.post('/paypal/conversionRate', function (req, res) {
    var convertKey  = req.body.convertFrom + '_' + req.body.convertTo;
    var result      = {};
    var input       = {};

    input.convertFrom = req.body.convertFrom;
    input.convertTo   = req.body.convertTo;
    input.local       = req.body.local;

    if (cc.verifyInput(input)) {
      cc.rates(input)
        .then(function (conversionRate) {
          result[convertKey] = conversionRate;
          res.send(200, result);
        })
        .catch(function (err) {
          res.send(500, "Error calculating conversion rate.");
        });
      } else {
        res.send(400, "Invalid input");
      }
  });

  app.get('*', function (req, res) {
    res.redirect('/paypal/activity');
  });

};