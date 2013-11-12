
Money v1.0.1
============

Money is a unified Javascript RequireJS/CommonJS module for the browser or server (SSJS) which
provides monetary mathematical operations and textual formatting. 

Monetary values are treated as numbers with their number of decimal places fixed at 2. Thus all
mathematical and comparison operations produce proper results for all currencies based on 1/100 of
a unit (such as dollars).

Contents
--------
* [Dependencies](#DEPENDENCIES)
* [Script Files](#SCRIPT_FILES)
* [Example](#EXAMPLE)
* [Constants](#CONSTANTS)
    * [NEGATIVE\_FORMATS](#NEGATIVE_FORMATS)
    * [SYMBOL\_POSITIONS](#SYMBOL_POSITIONS)
* [Money Object Creation](#MONEY_OBJECT_CREATION)
    * [make (value)](#MAKE)
* [Money Object Methods](#MONEY_OBJECT_METHODS)
    * [abs ()](#ABS)
    * [dividedBy (value)](#DIVIDEDBY)
    * [getValue ()](#GETVALUE)
    * [isEqualTo (value)](#ISEQUALTO)
    * [isGreaterThan (value)](#ISGREATERTHAN)
    * [isGreaterThanOrEqualTo (value)](#ISGREATERTHANOREQUALTO)
    * [isLessThan (value)](#ISLESSTHAN)
    * [isLessThanOrEqualTo (value)](#ISLESSTHANOREQUALTO)
    * [minus (value)](#MINUS)
    * [negate ()](#NEGATE)
    * [plus (value)](#PLUS)
    * [setValue (value)](#SETVALUE)
    * [times (value)](#TIMES)
    * [toString (symbol, negativeFormat, symbolPosition, thousandsSeparator, decimalSeparator)](#TOSTRING)
* [Module Functions](#MODULE_FUNCTIONS)
    * [currencySymbol (symbol)](#DEFAULTS.CURRENCYSYMBOL)
    * [decimalSeparator (separator)](#DEFAULTS.DECIMALSEPARATOR)
    * [negativeFormat (format)](#DEFAULTS.NEGATIVEFORMAT)
    * [symbolPosition (position)](#DEFAULTS.SYMBOLPOSITION)
    * [thousandsSeparator (separator)](#DEFAULTS.THOUSANDSSEPARATOR)
    * [isMoney (object)](#ISMONEY)
    * [setFormatFunction (formatFunction)](#SETFORMATFUNCTION)
    * [sum (values)](#SUM)
* [Testing](#TESTING)
* [Contributions](#CONTRIBUTIONS)
* [License](#LICENSE)


<a id="DEPENDENCIES"></a>
Dependencies
------------

* [RequireJS](http://requirejs.org) on the client (browser) side.
* [Wakanda](http://www.wakanda.org) v6+.

<a id="SCRIPT_FILES"></a>
Script Files
------------

* money.js - Fully commented script. Update to contribute.
* money.min.js - Minimized script. For normal use.
* money.no-md.js - Commented script without markdown comments. Use for debugging.

<a id="EXAMPLE"></a>
Example
-------

```javascript
var orderAmount = money.make(25);
var salesTaxRate = 0.06125;
var saleTaxAmount = orderAmount.times(salesTaxRate); // 1.53, not 1.53125
```

<a id="CONSTANTS"></a>
Constants
---------
<a id="NEGATIVE_FORMATS"></a>
### NEGATIVE\_FORMATS
* MINUS\_SIGN - Use a minus sign for negative monetary amounts when calling **toString()**.
* PARENTHESES - Use parentheses for negative monetary amounts when calling **toString()**.

Examples:

```javascript
var debit = money.make(-25.34);
debit.toString('$', money.NEGATIVE_FORMATS.MINUS_SIGN); // '-$25.34'
debit.toString('$', money.NEGATIVE_FORMATS.PARENTHESES); // '$(25.34)'
```

<a id="SYMBOL_POSITIONS"></a>
### SYMBOL\_POSITIONS
* AFTER - Place the currency symbol at the end when calling **toString()**.
* BEFORE - Place the currency symbol in the front when calling **toString()**.

Examples:

```javascript
var price = money.make(25);
price.toString(); // '$25.00'

money.defaults.symbolPosition(money.SYMBOL_POSITIONS.AFTER);
price.toString(); // '25.00$'
```

<a id="MONEY_OBJECT_CREATION"></a>
Money Object Creation
---------------------

<a id="MAKE"></a>
### make (value)

To create a Money object, simply call the **make()** function with an optional initial numeric
`value`. If no value is passed, the money object's amount is set to 0.00. If the given `value` is
already a money object, it is simply returned "as is." 

Examples:

```javascript
// Using RequireJS:
require(['money'], function (money) {
	var expense = money.make(24.50); // 24.50
	var discount = money.make(); // 0.00
});

// Using CommonJS:
var money = require('money');
var expense = money.make(24.50); // 24.50
var discount = money.make(); // 0.00
```

<a id="MONEY_OBJECT_METHODS"></a>
Money Object Methods
--------------------
<a id="ABS"></a>
### abs ()

Returns the absolute value of the value of the money object as a new money object.

Examples:

```javascript
money.make(-24.50).abs(); // 24.50
money.make(24.50).abs(); // 24.50
money.make(0.00).abs(); // 0.00
```
<a id="DIVIDEDBY"></a>
### dividedBy (value)

Divides the money amount by the given money or numeric `value` and returns the result. If the
given `value` is numeric, a money value is returned. If it is a money value, a numeric value is
returned.

Examples:

```javascript
money.make(24.50).dividedBy(2); // 12.25

var sales = money.make(100000);
var expenses = money.make(80000);
expenses.dividedBy(sales); // 0.8
```
<a id="GETVALUE"></a>
### getValue ()

Returns the numeric value of the money object.

Examples:

```javascript
money.make(24.50).getValue(); // 24.50
```
<a id="ISEQUALTO"></a>
### isEqualTo (value)

Returns *true* if the given numeric or money `value` is equal to the value of the money object and
returns *false* otherwise. If `value` is numeric, it is converted into a money object before
making the comparison.

Examples:

```javascript
var value1 = money.make(24.5);
var value2 = money.make(24.5);
var value3 = money.make(10);

value1.isEqualTo(value2); // true
value1.isEqualTo(value3); // false
value1.isEqualTo(24.502); // true
value1.isEqualTo(20); // false
```
<a id="ISGREATERTHAN"></a>
### isGreaterThan (value)

Returns *true* if the value of the money object is greater than the given numeric or money `value`
and returns *false* otherwise. If `value` is numeric, it is converted into a money object before
making the comparison.

Examples:

```javascript
var value1 = money.make(24.5);
var value2 = money.make(24.5);
var value3 = money.make(10);

value1.isGreaterThan(value3); // true
value1.isGreaterThan(value2); // false
value1.isGreaterThan(24.502); // false
value1.isGreaterThan(20); // true
```
<a id="ISGREATERTHANOREQUALTO"></a>
### isGreaterThanOrEqualTo (value)

Returns *true* if the value of the money object is greater than or equal to the given numeric or
money `value` and returns *false* otherwise. If `value` is numeric, it is converted into a money
object before making the comparison.

Examples:

```javascript
var value1 = money.make(24.5);
var value2 = money.make(24.5);
var value3 = money.make(10);
var value4 = money.make(30);

value1.isGreaterThanOrEqualTo(value2); // true
value1.isGreaterThanOrEqualTo(value3); // true
value1.isGreaterThanOrEqualTo(value4); // false
value1.isGreaterThanOrEqualTo(24.502); // true
value1.isGreaterThanOrEqualTo(30); // false
```
<a id="ISLESSTHAN"></a>
### isLessThan (value)

Returns *true* if the value of the money object is less than the given numeric or money `value`
and returns *false* otherwise. If `value` is numeric, it is converted into a money object before
making the comparison.

Examples:

```javascript
var value1 = money.make(24.5);
var value2 = money.make(24.5);
var value3 = money.make(10);
var value4 = money.make(30);

value1.isLessThan(value2); // false
value1.isLessThan(value3); // false
value1.isLessThan(value4); // true
value1.isLessThan(24.502); // false
value1.isLessThan(30); // true
```
<a id="ISLESSTHANOREQUALTO"></a>
### isLessThanOrEqualTo (value)

Returns *true* if the value of the money object is less than or equal to the given numeric or
money `value` and returns *false* otherwise. If `value` is numeric, it is converted into a money
object before making the comparison.

Examples:

```javascript
var value1 = money.make(24.5);
var value2 = money.make(24.5);
var value3 = money.make(10);
var value4 = money.make(30);

value1.isLessThanOrEqualTo(value2); // true
value1.isLessThanOrEqualTo(value3); // false
value1.isLessThanOrEqualTo(value4); // true
value1.isLessThanOrEqualTo(24.502); // true
value1.isLessThanOrEqualTo(30); // true
```
<a id="MINUS"></a>
### minus (value)

Subtracts the given money or numeric `value` from the money amount and returns the result as a
new money object.

Examples:

```javascript
money.make(24.50).minus(10.503); // 14.00

var sales = money.make(100000);
var expenses = money.make(80000);
sales.minus(expenses); // 20,000.00
```
<a id="NEGATE"></a>
### negate ()

Returns the negative of the value of the money object as a new money object.

Examples:

```javascript
money.make(24.50).negate(); // -24.50
money.make(-24.50).negate(); // 24.50
```
<a id="PLUS"></a>
### plus (value)

Adds the given money or numeric `value` to the money amount and returns the result as a new
money object.

Examples:

```javascript
money.make(24.50).plus(10.503); // 35.00

var sales = money.make(100000);
var otherIncome = money.make(2000);
sales.plus(otherIncome); // 102,000.00
```
<a id="SETVALUE"></a>
### setValue (value)

Sets the value of the money object to the given numeric or money `value`.

Examples:

```javascript
var shipping = money.make();
var handling = money.make();
shipping.setValue(5).getValue(); // 5.00
handling.setValue(shipping).getValue(); // 5.00
```
<a id="TIMES"></a>
### times (value)

Multiplies the money amount by the given numeric `value` and returns the result as a new money object.

Examples:

```javascript
money.make(24).times(10); // 240.00

var orderAmount = money.make(100);
var salesTaxRate = 0.05;
orderAmount.times(salesTaxRate); // 5.00
```
<a id="TOSTRING"></a>
### toString (symbol, negativeFormat, symbolPosition, thousandsSeparator, decimalSeparator)

Returns a string which represents the money object's value.

##### Arguments

* `symbol` *Optional* - A character that denotes the type of currency. For example, the symbol for U.S. dollars
is "$". Pass a null string for no symbol. If not given, the default value is used. The inital default symbol
is set to "$". To change the default symbol or to pass it to this method when specifying a subsequent argument
(like decimalSeparator), see the **defaults.currencySymbol()** module function.

* `negativeFormat` *Optional* - Specifies whether to indicate a negative value with a minus sign or parentheses.
See the **NEGATIVE\_FORMATS** constants. If not given, the default value is used. The inital default is to use a minus
sign. To change the default or to pass it to this method when specifying a subsequent argument (like decimalSeparator),
see the **defaults.negativeFormat()** module function.

* `symbolPosition` *Optional* - Specifies where the currency symbol should appear. See the **SYMBOL\_POSITIONS** constants.
If not given, the default value is used. The inital default is to place the symbol in the front of the returned string.
To change the default or to pass it to this method when specifying a subsequent argument (like decimalSeparator),
see the **defaults.symbolPosition()** module function.

* `thousandsSeparator` *Optional* - A character used to separate groups of 3 digits. For example, if the character is
a comma, then a monetary amount of 12345.00 would return "12,345.00". If not given, the default value is used. The inital
default separator is set to a comma ",". To change the default separator or to pass it to this method when specifying a
subsequent argument (like decimalSeparator), see the **defaults.thousandsSeparator()** module function.

* `decimalSeparator` *Optional* - A character used to separate the integer and decimal parts of the monetary amount.
For example, if the character is a period, then a monetary amount of 12 would return "12.00". If not given, the default
value is used. The inital default separator is set to a period ".". To change the default separator, see the
**defaults.decimalSeparator()** module function.

##### Setting Formatting Without Passing Arguments

**toString()** can call a function defined by the **setFormatFunction()** module function to set one or more of the
formatting defaults each time **toString()** is called. This facilitates applying different formatting depending on
the current calling environment. For example, **toString()** may be called for different users with
different money format preferences. The function passed to **setFormatFunction()** can determine the correct format preferences
for each user and pass them back to **toString()**. See the **setFormatFunction()** module function.

Examples:

```javascript
var price = money.make(19.95);
price.toString(); // '$19.95'
price.toString(''); // '19.95'
price.toString('$', money.NEGATIVE_FORMATS.MINUS_SIGN, money.SYMBOL_POSITIONS.AFTER, '.', ','); // '19,95$'

money.defaults.currencySymbol(''); // default is no currency symbol
price.toString(); // '19.95'
```

<a id="MODULE_FUNCTIONS"></a>
Module Functions
----------------
<a id="DEFAULTS.CURRENCYSYMBOL"></a>
### defaults.currencySymbol (symbol)

Returns the default currency symbol when calling the **toString()** method. If the optional `symbol`
string argument is passed, sets the default currency symbol to the argument's value. The initial
default value is "$".

Examples:

```javascript
money.defaults.currencySymbol(); // '$'
money.defaults.currencySymbol(''); // '', do not use a currency symbol by default
```
<a id="DEFAULTS.DECIMALSEPARATOR"></a>
### defaults.decimalSeparator (separator)

Returns the default decimal separator (a character used to separate the integer and decimal parts
of a monetary amount) when calling the **toString()** method. For example, if the character is a
period, then a monetary amount of 12 would return "12.00" from **toString()**. If the optional
`separator` string argument is passed, sets the default separator to the argument's value. The
initial default value is a period ".".

Examples:

```javascript
money.defaults.decimalSeparator(); // '.'
money.defaults.decimalSeparator(','); // ','
```
<a id="DEFAULTS.NEGATIVEFORMAT"></a>
### defaults.negativeFormat (format)

Returns the default negative format when calling the **toString()** method. If the optional `format`
argument is passed, sets the default format to the argument's value. See the **NEGATIVE\_FORMATS**
constants for valid values. The initial default value is **NEGATIVE\_FORMATS.MINUS_SIGN**

Examples:

```javascript
money.defaults.negativeFormat(); // money.NEGATIVE_FORMATS.MINUS_SIGN
money.defaults.negativeFormat(money.NEGATIVE_FORMATS.PARENTHESES); // money.NEGATIVE_FORMATS.PARENTHESES
```
<a id="DEFAULTS.SYMBOLPOSITION"></a>
### defaults.symbolPosition (position)

Returns the default symbol position when calling the **toString()** method. If the optional `position`
argument is passed, sets the default position to the argument's value. See the **SYMBOL\_POSITIONS**
constants for valid values. The initial default value is **SYMBOL\_POSITIONS.BEFORE**.

Examples:

```javascript
money.defaults.symbolPosition(); // money.SYMBOL_POSITIONS.BEFORE
money.defaults.symbolPosition(money.SYMBOL_POSITIONS.AFTER); // money.SYMBOL_POSITIONS.AFTER
```
<a id="DEFAULTS.THOUSANDSSEPARATOR"></a>
### defaults.thousandsSeparator (separator)

Returns the default thousands separator (a character used to separate groups of 3 digits) when
calling the **toString()** method. For example, if the character is a comma, then a monetary amount
of 12345.00 would return "12,345.00" from **toString()**. If the optional `separator` string
argument is passed, sets the default separator to the argument's value. The initial
default value is a comma ",".

Examples:

```javascript
money.defaults.thousandsSeparator(); // ','
money.defaults.thousandsSeparator('.'); // '.'
```
<a id="ISMONEY"></a>
### isMoney (object)

Returns *true* if the given `object` is an instance of a money object and returns *false*
otherwise.

Examples:

```javascript
var price = money.make(19.95);
money.isMoney(price); // true
money.isMoney(19.95); // false
```
<a id="SETFORMATFUNCTION"></a>
### setFormatFunction (formatFunction)

Sets a function to be called each time the **toString()** method is called to set defaults for the
format. This facilitates applying different formatting depending on the current calling environment.
For example, **toString()** may be called for different users with different money
format preferences. The function passed to **setFormatFunction()** can determine the correct format
preferences for each user and pass them back to **toString()**.

`formatFunction` should return an object containing one or more of the following properties:

* `symbol` *Optional* - A character that denotes the type of currency. Example: '$'.

* `negativeFormat` *Optional* - Specifies whether to indicate a negative value with a minus sign
or parentheses. See the **NEGATIVE\_FORMATS** constants. Example: money.NEGATIVE_FORMATS.PARENTHESES.

* `symbolPosition` *Optional* - Specifies where the currency symbol should appear. See the
**SYMBOL\_POSITIONS** constants. Example: money.SYMBOL_POSITIONS.AFTER.

* `thousandsSeparator` *Optional* - A character used to separate groups of 3 digits. For example,
if the character is a comma, then **money.make(12345).toString()** would return "12,345.00".

* `decimalSeparator` *Optional* - A character used to separate the integer and decimal parts of 
the monetary amount. For example, if the character is a period, then **money.make(12).toString()**
would return "12.00". 

Examples:

```javascript
money.setFormatFunction (
	function () {
		// This is just an example. Normally, this function would return something other than static values.

		return {	symbol 				: '$',
					negativeFormat 		: money.NEGATIVE_FORMATS.PARENTHESES,
					symbolPosition 		: money.SYMBOL_POSITIONS.AFTER,
					thousandsSeparator 	: '.',
					decimalSeparator 	: ','
			   };
	});

var netProfit = money.make(-12345.67);
netProfit.toString(); // '(12.345,67)$'
netProfit.toString('', money.NEGATIVE_FORMATS.MINUS_SIGN); // '-$12.345,67' (override symbol and negative format)
```
<a id="SUM"></a>
### sum (values)

Returns a money object representing the sum of the given array of `values`. Each value in the
array can be a number or a money object. Each numeric value is treated as a monetary value by
converting it to a money object before adding it to the total.

Examples:

```javascript
var expenses = [money.make(10), money.make(20), 30.345];
money.sum(expenses); // 60.35
```

<a id="TESTING"></a>
Testing
-------
money uses Wakanda's implementation of [YUI Test](http://yuilibrary.com/yui/docs/test/). 

##### To test the client side:

1. In Wakanda Studio, open WebFolder/index/index.html.
2. Click Run. The results should appear in your browser.

##### To test the server side:

1. In Wakanda Studio, open scripts/test.js.
2. Click Run File. The results should appear in your browser.

<a id="CONTRIBUTIONS"></a>
Contributions
-------------
If you contribute to this library, just modify `WebFolder/scripts/money.js` and 
`WebFolder/scripts/testCases.js` or `Modules/money.js` and `Modules/money.js` and send a
pull request. Please remember to update the markdown if the public interface changes. 

<a id="LICENSE"></a>
License
-------
Licensed under MIT.

Copyright (C) 2013 [Jeff Grann](https://github.com/jeffgrann) <jeff@successware.net>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and
associated documentation files (the "Software"), to deal in the Software without restriction,
including without limitation the rights to use, copy, modify, merge, publish, distribute,
sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions: 

The above copyright notice and this permission notice shall be included in all copies or substantial
portions of the Software. 

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT
NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT
OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE. 
