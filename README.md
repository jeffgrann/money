
Money
=====

Money is a Javascript RequireJS-ready and CommonJS-ready module for the browser or server (SSJS)
which provides monetary mathematical operations and textual formatting.

Monetary values are treated as numbers with their number of decimal places fixed at 2. Thus all
mathematical and comparison operations produce proper results for all currencies based on 1/100 of
a unit (such as dollars).

Example
-------

```javascript
var orderAmount = money(25);
var salesTaxRate = 0.06125;
var saleTaxAmount = orderAmount.times(salesTaxRate); // 1.53, not 1.53125
```

Dependencies
------------

* None

Money Object Creation
---------------------

### money (value)

To create a Money object, simply call the function returned by this module with an optional
initial numeric `value`. If no value is passed, the money object's amount is set to 0.00. If the
given `value` is already a money object, it is simply returned "as is."

Examples:

```javascript
// Plain browser (no AMD or CommonJS):
var expense = money(24.50); // 24.50
var discount = money(); // 0.00

// Using RequireJS:
require(['money'], function (money) {
	var expense = money(24.50); // 24.50
	var discount = money(); // 0.00
});

// Using CommonJS:
var money = require('money');
var expense = money(24.50); // 24.50
var discount = money(); // 0.00
```

Money Object Methods
--------------------
### abs ()

Returns the absolute value of the value of the money object as a new money object.

Examples:

```javascript
money(-24.50).abs(); // 24.50
money(24.50).abs(); // 24.50
money(0.00).abs(); // 0.00
```
### dividedBy (value)

Divides the money amount by the given money or numeric `value` and returns the result. If the
given `value` is numeric, a money value is returned. If it is a money value, a numeric value is
returned.

Examples:

```javascript
money(24.50).dividedBy(2); // 12.25

var sales = money(100000);
var expenses = money(80000);
expenses.dividedBy(sales); // 0.8
```
### getValue ()

Returns the numeric value of the money object.

Examples:

```javascript
money(24.50).getValue(); // 24.50
```
### isEqualTo (value)

Returns *true* if the given numeric or money `value` is equal to the value of the money object and
returns *false* otherwise. If `value` is numeric, it is converted into a money object before
making the comparison.

Examples:

```javascript
var value1 = money(24.5);
var value2 = money(24.5);
var value3 = money(10);

value1.isEqualTo(value2); // true
value1.isEqualTo(value3); // false
value1.isEqualTo(24.502); // true
value1.isEqualTo(20); // false
```
### isGreaterThan (value)

Returns *true* if the value of the money object is greater than the given numeric or money `value`
and returns *false* otherwise. If `value` is numeric, it is converted into a money object before
making the comparison.

Examples:

```javascript
var value1 = money(24.5);
var value2 = money(24.5);
var value3 = money(10);

value1.isGreaterThan(value3); // true
value1.isGreaterThan(value2); // false
value1.isGreaterThan(24.502); // false
value1.isGreaterThan(20); // true
```
### isGreaterThanOrEqualTo (value)

Returns *true* if the value of the money object is greater than or equal to the given numeric or
money `value` and returns *false* otherwise. If `value` is numeric, it is converted into a money
object before making the comparison.

Examples:

```javascript
var value1 = money(24.5);
var value2 = money(24.5);
var value3 = money(10);
var value4 = money(30);

value1.isGreaterThanOrEqualTo(value2); // true
value1.isGreaterThanOrEqualTo(value3); // true
value1.isGreaterThanOrEqualTo(value4); // false
value1.isGreaterThanOrEqualTo(24.502); // true
value1.isGreaterThanOrEqualTo(30); // false
```
### isLessThan (value)

Returns *true* if the value of the money object is less than the given numeric or money `value`
and returns *false* otherwise. If `value` is numeric, it is converted into a money object before
making the comparison.

Examples:

```javascript
var value1 = money(24.5);
var value2 = money(24.5);
var value3 = money(10);
var value4 = money(30);

value1.isLessThan(value2); // false
value1.isLessThan(value3); // false
value1.isLessThan(value4); // true
value1.isLessThan(24.502); // false
value1.isLessThan(30); // true
```
### isLessThanOrEqualTo (value)

Returns *true* if the value of the money object is less than or equal to the given numeric or
money `value` and returns *false* otherwise. If `value` is numeric, it is converted into a money
object before making the comparison.

Examples:

```javascript
var value1 = money(24.5);
var value2 = money(24.5);
var value3 = money(10);
var value4 = money(30);

value1.isLessThanOrEqualTo(value2); // true
value1.isLessThanOrEqualTo(value3); // false
value1.isLessThanOrEqualTo(value4); // true
value1.isLessThanOrEqualTo(24.502); // true
value1.isLessThanOrEqualTo(30); // true
```
### minus (value)

Subtracts the given money or numeric `value` from the money amount and returns the result as a
new money object.

Examples:

```javascript
money(24.50).minus(10.503); // 14.00

var sales = money(100000);
var expenses = money(80000);
sales.minus(expenses); // 20,000.00
```
### negate ()

Returns the negative of the value of the money object as a new money object.

Examples:

```javascript
money(24.50).negate(); // -24.50
money(-24.50).negate(); // 24.50
```
### plus (value)

Adds the given money or numeric `value` to the money amount and returns the result as a new
money object.

Examples:

```javascript
money(24.50).plus(10.503); // 35.00

var sales = money(100000);
var otherIncome = money(2000);
sales.plus(otherIncome); // 102,000.00
```
### setValue (value)

Sets the value of the money object to the given numeric or money `value`.

Examples:

```javascript
var shipping = money();
var handling = money();
shipping.setValue(5).getValue(); // 5.00
handling.setValue(shipping).getValue(); // 5.00
```
### times (value)

Multiplies the money amount by the given numeric `value` and returns the result as a new money object.

Examples:

```javascript
money(24).times(10); // 240.00

var orderAmount = money(100);
var salesTaxRate = 0.05;
orderAmount.times(salesTaxRate); // 5.00
```
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
var price = money(19.95);
price.toString(); // '$19.95'
price.toString(''); // '19.95'
price.toString('$', money.NEGATIVE_FORMATS.MINUS_SIGN, money.SYMBOL_POSITIONS.AFTER, '.', ','); // '19,95$'

money.defaults.currencySymbol(''); // default is no currency symbol
price.toString(); // '19.95'
```

Module Functions
----------------
### defaults.currencySymbol (symbol)

Returns the default currency symbol when calling the **toString()** method. If the optional `symbol`
string argument is passed, sets the default currency symbol to the argument's value. The initial
default value is "$".

Examples:

```javascript
money.defaults.currencySymbol(); // '$'
money.defaults.currencySymbol(''); // '', do not use a currency symbol by default
```
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
### defaults.negativeFormat (format)

Returns the default negative format when calling the **toString()** method. If the optional `format`
argument is passed, sets the default format to the argument's value. See the **NEGATIVE\_FORMATS**
constants for valid values. The initial default value is **NEGATIVE\_FORMATS.MINUS_SIGN**

Examples:

```javascript
money.defaults.negativeFormat(); // money.NEGATIVE_FORMATS.MINUS_SIGN
money.defaults.negativeFormat(money.NEGATIVE_FORMATS.PARENTHESES); // money.NEGATIVE_FORMATS.PARENTHESES
```
### defaults.symbolPosition (position)

Returns the default symbol position when calling the **toString()** method. If the optional `position`
argument is passed, sets the default position to the argument's value. See the **SYMBOL\_POSITIONS**
constants for valid values. The initial default value is **SYMBOL\_POSITIONS.BEFORE**.

Examples:

```javascript
money.defaults.symbolPosition(); // money.SYMBOL_POSITIONS.BEFORE
money.defaults.symbolPosition(money.SYMBOL_POSITIONS.AFTER); // money.SYMBOL_POSITIONS.AFTER
```
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
### isMoney (object)

Returns *true* if the given `object` is an instance of a money object and returns *false*
otherwise.

Examples:

```javascript
var price = money(19.95);
money.isMoney(price); // true
money.isMoney(19.95); // false
```
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
if the character is a comma, then **money(12345).toString()** would return "12,345.00".

* `decimalSeparator` *Optional* - A character used to separate the integer and decimal parts of
the monetary amount. For example, if the character is a period, then **money(12).toString()** would
return "12.00".

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

var netProfit = money(-12345.67);
netProfit.toString(); // '(12.345,67)$'
netProfit.toString('', money.NEGATIVE_FORMATS.MINUS_SIGN); // '-$12.345,67' (override symbol and negative format)
```
### sum (values)

Returns a money object representing the sum of the given array of `values`. Each value in the
array can be a number or a money object. Each numeric value is treated as a monetary value by
converting it to a money object before adding it to the total.

Examples:

```javascript
var expenses = [money(10), money(20), 30.345];
money.sum(expenses); // 60.35
```

Constants
---------
### NEGATIVE\_FORMATS
* MINUS\_SIGN - Use a minus sign for negative monetary amounts when calling **toString()**.
* PARENTHESES - Use parentheses for negative monetary amounts when calling **toString()**.

Examples:

```javascript
var debit = money(-25.34);
debit.toString('$', money.NEGATIVE_FORMATS.MINUS_SIGN); // '-$25.34'
debit.toString('$', money.NEGATIVE_FORMATS.PARENTHESES); // '$(25.34)'
```

### SYMBOL\_POSITIONS
* AFTER - Place the currency symbol at the end when calling **toString()**.
* BEFORE - Place the currency symbol in the front when calling **toString()**.

Examples:

```javascript
var price = money(25);
price.toString(); // '$25.00'

money.defaults.symbolPosition(money.SYMBOL_POSITIONS.AFTER);
price.toString(); // '25.00$'
```
