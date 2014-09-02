currency-converter
==================
Lightweight server to test my <a href="http://nodejs.org/currency-converter">currency-converter</a> module.

<h1> Start </h1>
Register for your <a href='https://openexchangerates.org/signup/free'>openexchangerates</a>.
```
npm install
```
Inside  app/routes/routes.js:1 is where you'll insert your own key after registration.
<em>NOTE: fetchInterval is optional. It is set to fetch once per hour by default. </em>

<h1> API </h1>
<h2>app.get('/paypal/currencyConversion', callback)</h2> 
Returns an object with the amount converted in the specificed currency.

Expected params:
```
{
  amount: 1.00
  convertFrom: 'USD',
  convertTo: 'EUR',
  live: true // OPTIONAL. Retrieves locally stored rates by default.
}
```
<h3> Usage </h3>
```
localhost:8080/paypal/currencyConversion?amount=10&convertFrom=USD&convertTo=EUR
// => {"currency":"EUR","symbol":"€","amount":7.6}
```

<h2>app.get('/paypal/conversionRate', callback)</h2>
Returns an object with the conversion rate between two currencies.

Expected params:
```
{
  convertFrom: 'USD',
  convertTo: 'EUR'
}
```
<h3> Usage </h3>
```
localhost:8080/paypal/conversionRate?convertFrom=USD&convertTo=EUR
// => {"USD_EUR":0.76}
```


