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


<h2>app.post('/paypal/currencyConversion', callback)</h2> 
Returns an object with the amount converted in the specificed currency.

Expect req.body to be:
```
{
  amount: 1.00
  convertFrom: 'USD',
  convertTo: 'EUR',
  local: true // local is OPTIONAL. By default, it will fetch live rates.
}
```
<img src='http://i.imgur.com/a5nXIoC.png'>

<h2>app.post('/paypal/conversionRate', callback)</h2>
Returns an object with the conversion rate between two currencies.

Expect req.body to be: 
```
{
  convertFrom: 'USD',
  convertTo: 'EUR'
}
```

<img src='http://i.imgur.com/a8R8i0N.png'/>

