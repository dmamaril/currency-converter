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

<h1> Usage </h1>


<h2>app.get('/paypal/currencyConversion', callback)</h2> 
Returns an object with the amount converted in the specificed currency.

Expect req.body to be:
```
{
  amount: 1.00
  convertFrom: 'USD',
  convertTo: 'EUR',
  live: true // OPTIONAL. Retrieves locally stored rates by default.
}
```

<h2>app.get('/paypal/conversionRate', callback)</h2>
Returns an object with the conversion rate between two currencies.

Expect req.body to be: 
```
{
  convertFrom: 'USD',
  convertTo: 'EUR'
}
```
