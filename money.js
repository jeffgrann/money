//****************************************************************************************************
// MODULE: money
//****************************************************************************************************
//|
//| Money
//| =====
//|
//| Money is a Javascript RequireJS-ready and CommonJS-ready module for the browser or server (SSJS)
//| which provides monetary mathematical operations and textual formatting.
//|
//| Monetary values are treated as numbers with their number of decimal places fixed at 2. Thus all
//| mathematical and comparison operations produce proper results for all currencies based on 1/100 of
//| a unit (such as dollars).
//|
//| Example
//| -------
//|
//| ```javascript
//| var orderAmount = money(25);
//| var salesTaxRate = 0.06125;
//| var saleTaxAmount = orderAmount.times(salesTaxRate); // 1.53, not 1.53125
//|```
//----------------------------------------------------------------------------------------------------

//****************************************************************************************************
// Flexible Module Definition
//****************************************************************************************************
//|
//| Dependencies
//| ------------
//|
//| * None
//----------------------------------------------------------------------------------------------------
(function (definition) {
	// CommonJS
	if (typeof exports === 'object') {
		module.exports = definition();
	}
	// RequireJS
	else if (typeof define === 'function' && define.amd) {
		define(definition);
	}
	// Plain browser
	else {
		window.money = definition();
	}
})(


//----------------------------------------------------------------------------------------------------
// money
//----------------------------------------------------------------------------------------------------
function () {
	var DECIMAL_CONSTANTS;
	var defaults;
	var defaultDecimalSeparator;
	var defaultNegativeFormat;
	var defaultSymbol;
	var defaultSymbolPosition;
	var defaultThousandsSeparator;
	var getFormat;
	var isMoney;
	var Money;
	var moneyMaker;
	var NEGATIVE_FORMATS;
	var setFormatFunction;
	var sum;
	var SYMBOL_POSITIONS;

	//****************************************************************************************************
	// Constants
	//****************************************************************************************************
	DECIMAL_CONSTANTS = {
			PLACES : 2,
			FACTOR : 100
		};
	
	Object.freeze(DECIMAL_CONSTANTS);
		
	NEGATIVE_FORMATS = {
			MINUS_SIGN 	: 'MINUS_SIGN',
			PARENTHESES : 'PARENTHESES'
		};

	Object.freeze(NEGATIVE_FORMATS);

	SYMBOL_POSITIONS = {
			AFTER 	: 'AFTER',
			BEFORE 	: 'BEFORE'
		};
		
	Object.freeze(SYMBOL_POSITIONS);
		
	//****************************************************************************************************
	// Defaults
	//****************************************************************************************************
	defaultDecimalSeparator = '.';
	defaultNegativeFormat = NEGATIVE_FORMATS.MINUS_SIGN;
	defaultSymbol = '$';
	defaultSymbolPosition = SYMBOL_POSITIONS.BEFORE;
	defaultThousandsSeparator = ',';
	
	defaults = {};
	
	//****************************************************************************************************
	// Constructor
	//****************************************************************************************************
	Money =
		function Money (valueInCents) {
			valueInCents = typeof valueInCents === 'number' ? valueInCents : 0;
			this._valueInCents = valueInCents;
		};
		
	//****************************************************************************************************
	// moneyMaker
	//****************************************************************************************************
	//|
	//| Money Object Creation
	//| ---------------------
	//|
	//| ### money (value)
	//|
	//| To create a Money object, simply call the function returned by this module with an optional
	//| initial numeric `value`. If no value is passed, the money object's amount is set to 0.00. If the
	//| given `value` is already a money object, it is simply returned "as is."
	//|
	//| Examples:
	//|
	//| ```javascript
	//| // Plain browser (no AMD or CommonJS):
	//| var expense = money(24.50); // 24.50
	//| var discount = money(); // 0.00
	//|
	//| // Using RequireJS:
	//| require(['money'], function (money) {
	//| 	var expense = money(24.50); // 24.50
	//| 	var discount = money(); // 0.00
	//| });
	//|
	//| // Using CommonJS:
	//| var money = require('money');
	//| var expense = money(24.50); // 24.50
	//| var discount = money(); // 0.00
	//| ```
	//----------------------------------------------------------------------------------------------------
	moneyMaker =
		function moneyMaker (value) {
			//----------------------------------------------------------------------------------------------------
			// If the given value is already a money object, just return it.
			//----------------------------------------------------------------------------------------------------
			if (isMoney(value)) {
				return value;
			}
			
			//----------------------------------------------------------------------------------------------------
			// Otherwise, create a new money object and return it.
			//----------------------------------------------------------------------------------------------------
			return new Money().setValue(value);
		};
	
	//****************************************************************************************************
	//|
	//| Money Object Methods
	//| --------------------
	//****************************************************************************************************

	//****************************************************************************************************
	// abs
	//****************************************************************************************************
	//| ### abs ()
	//|
	//| Returns the absolute value of the value of the money object as a new money object.
	//|
	//| Examples:
	//|
	//| ```javascript
	//| money(-24.50).abs(); // 24.50
	//| money(24.50).abs(); // 24.50
	//| money(0.00).abs(); // 0.00
	//| ```
	//----------------------------------------------------------------------------------------------------
	Money.prototype.abs =
		function abs (value) {
			return new this.constructor(Math.abs(this._valueInCents));
		};
	
	//****************************************************************************************************
	// dividedBy
	//****************************************************************************************************
	//| ### dividedBy (value)
	//|
	//| Divides the money amount by the given money or numeric `value` and returns the result. If the
	//| given `value` is numeric, a money value is returned. If it is a money value, a numeric value is
	//| returned.
	//|
	//| Examples:
	//|
	//| ```javascript
	//| money(24.50).dividedBy(2); // 12.25
	//|
	//| var sales = money(100000);
	//| var expenses = money(80000);
	//| expenses.dividedBy(sales); // 0.8
	//| ```
	//----------------------------------------------------------------------------------------------------
	Money.prototype.dividedBy =
		function dividedBy (divisor) {
			debugger;
			if (typeof divisor === 'number') {
				return new this.constructor(Math.round(this._valueInCents / divisor));
			}
			else if (isMoney(divisor)) {
				return this._valueInCents / divisor._valueInCents;
			}
			else {
				throw new Error("The money dividedBy method was passed something other than a money value or a number.");
			}
		};
			
	//****************************************************************************************************
	// getValue
	//****************************************************************************************************
	//| ### getValue ()
	//|
	//| Returns the numeric value of the money object.
	//|
	//| Examples:
	//|
	//| ```javascript
	//| money(24.50).getValue(); // 24.50
	//| ```
	//----------------------------------------------------------------------------------------------------
	Money.prototype.getValue =
		function getValue () {
			return this._valueInCents / DECIMAL_CONSTANTS.FACTOR;
		};
	
	//****************************************************************************************************
	// isEqualTo
	//****************************************************************************************************
	//| ### isEqualTo (value)
	//|
	//| Returns *true* if the given numeric or money `value` is equal to the value of the money object and
	//| returns *false* otherwise. If `value` is numeric, it is converted into a money object before
	//| making the comparison.
	//|
	//| Examples:
	//|
	//| ```javascript
	//| var value1 = money(24.5);
	//| var value2 = money(24.5);
	//| var value3 = money(10);
	//|
	//| value1.isEqualTo(value2); // true
	//| value1.isEqualTo(value3); // false
	//| value1.isEqualTo(24.502); // true
	//| value1.isEqualTo(20); // false
	//| ```
	//----------------------------------------------------------------------------------------------------
	Money.prototype.isEqualTo =
		function isEqualTo (valueToCompare) {
			return this._valueInCents === moneyMaker(valueToCompare)._valueInCents;
		};
	
	//****************************************************************************************************
	// isGreaterThan
	//****************************************************************************************************
	//| ### isGreaterThan (value)
	//|
	//| Returns *true* if the value of the money object is greater than the given numeric or money `value`
	//| and returns *false* otherwise. If `value` is numeric, it is converted into a money object before
	//| making the comparison.
	//|
	//| Examples:
	//|
	//| ```javascript
	//| var value1 = money(24.5);
	//| var value2 = money(24.5);
	//| var value3 = money(10);
	//|
	//| value1.isGreaterThan(value3); // true
	//| value1.isGreaterThan(value2); // false
	//| value1.isGreaterThan(24.502); // false
	//| value1.isGreaterThan(20); // true
	//| ```
	//----------------------------------------------------------------------------------------------------
	Money.prototype.isGreaterThan =
		function isGreaterThan (valueToCompare) {
			return this._valueInCents > moneyMaker(valueToCompare)._valueInCents;
		};
	
	//****************************************************************************************************
	// isGreaterThanOrEqualTo
	//****************************************************************************************************
	//| ### isGreaterThanOrEqualTo (value)
	//|
	//| Returns *true* if the value of the money object is greater than or equal to the given numeric or
	//| money `value` and returns *false* otherwise. If `value` is numeric, it is converted into a money
	//| object before making the comparison.
	//|
	//| Examples:
	//|
	//| ```javascript
	//| var value1 = money(24.5);
	//| var value2 = money(24.5);
	//| var value3 = money(10);
	//| var value4 = money(30);
	//|
	//| value1.isGreaterThanOrEqualTo(value2); // true
	//| value1.isGreaterThanOrEqualTo(value3); // true
	//| value1.isGreaterThanOrEqualTo(value4); // false
	//| value1.isGreaterThanOrEqualTo(24.502); // true
	//| value1.isGreaterThanOrEqualTo(30); // false
	//| ```
	//----------------------------------------------------------------------------------------------------
	Money.prototype.isGreaterThanOrEqualTo =
		function isGreaterThanOrEqualTo (valueToCompare) {
			return this._valueInCents >= moneyMaker(valueToCompare)._valueInCents;
		};
	
	//****************************************************************************************************
	// isLessThan
	//****************************************************************************************************
	//| ### isLessThan (value)
	//|
	//| Returns *true* if the value of the money object is less than the given numeric or money `value`
	//| and returns *false* otherwise. If `value` is numeric, it is converted into a money object before
	//| making the comparison.
	//|
	//| Examples:
	//|
	//| ```javascript
	//| var value1 = money(24.5);
	//| var value2 = money(24.5);
	//| var value3 = money(10);
	//| var value4 = money(30);
	//|
	//| value1.isLessThan(value2); // false
	//| value1.isLessThan(value3); // false
	//| value1.isLessThan(value4); // true
	//| value1.isLessThan(24.502); // false
	//| value1.isLessThan(30); // true
	//| ```
	//----------------------------------------------------------------------------------------------------
	Money.prototype.isLessThan =
		function isLessThan (valueToCompare) {
			return this._valueInCents < moneyMaker(valueToCompare)._valueInCents;
		};
	
	//****************************************************************************************************
	// isLessThanOrEqualTo
	//****************************************************************************************************
	//| ### isLessThanOrEqualTo (value)
	//|
	//| Returns *true* if the value of the money object is less than or equal to the given numeric or
	//| money `value` and returns *false* otherwise. If `value` is numeric, it is converted into a money
	//| object before making the comparison.
	//|
	//| Examples:
	//|
	//| ```javascript
	//| var value1 = money(24.5);
	//| var value2 = money(24.5);
	//| var value3 = money(10);
	//| var value4 = money(30);
	//|
	//| value1.isLessThanOrEqualTo(value2); // true
	//| value1.isLessThanOrEqualTo(value3); // false
	//| value1.isLessThanOrEqualTo(value4); // true
	//| value1.isLessThanOrEqualTo(24.502); // true
	//| value1.isLessThanOrEqualTo(30); // true
	//| ```
	//----------------------------------------------------------------------------------------------------
	Money.prototype.isLessThanOrEqualTo =
		function isLessThanOrEqualTo (valueToCompare) {
			return this._valueInCents <= moneyMaker(valueToCompare)._valueInCents;
		};
			
	//****************************************************************************************************
	// minus
	//****************************************************************************************************
	//| ### minus (value)
	//|
	//| Subtracts the given money or numeric `value` from the money amount and returns the result as a
	//| new money object.
	//|
	//| Examples:
	//|
	//| ```javascript
	//| money(24.50).minus(10.503); // 14.00
	//|
	//| var sales = money(100000);
	//| var expenses = money(80000);
	//| sales.minus(expenses); // 20,000.00
	//| ```
	//----------------------------------------------------------------------------------------------------
	Money.prototype.minus =
		function minus (valueToSubtract) {
			return new this.constructor(this._valueInCents - moneyMaker(valueToSubtract)._valueInCents);
		};
	
	//****************************************************************************************************
	// negate
	//****************************************************************************************************
	//| ### negate ()
	//|
	//| Returns the negative of the value of the money object as a new money object.
	//|
	//| Examples:
	//|
	//| ```javascript
	//| money(24.50).negate(); // -24.50
	//| money(-24.50).negate(); // 24.50
	//| ```
	//----------------------------------------------------------------------------------------------------
	Money.prototype.negate =
		function negate () {
			return new this.constructor(-this._valueInCents);
		};
	
	//****************************************************************************************************
	// plus
	//****************************************************************************************************
	//| ### plus (value)
	//|
	//| Adds the given money or numeric `value` to the money amount and returns the result as a new
	//| money object.
	//|
	//| Examples:
	//|
	//| ```javascript
	//| money(24.50).plus(10.503); // 35.00
	//|
	//| var sales = money(100000);
	//| var otherIncome = money(2000);
	//| sales.plus(otherIncome); // 102,000.00
	//| ```
	//----------------------------------------------------------------------------------------------------
	Money.prototype.plus =
		function plus (valueToAdd) {
			return new this.constructor(this._valueInCents + moneyMaker(valueToAdd)._valueInCents);
		};
	
	//****************************************************************************************************
	// setValue
	//****************************************************************************************************
	//| ### setValue (value)
	//|
	//| Sets the value of the money object to the given numeric or money `value`.
	//|
	//| Examples:
	//|
	//| ```javascript
	//| var shipping = money();
	//| var handling = money();
	//| shipping.setValue(5).getValue(); // 5.00
	//| handling.setValue(shipping).getValue(); // 5.00
	//| ```
	//----------------------------------------------------------------------------------------------------
	Money.prototype.setValue =
		function setValue (value) {
			value = value || 0;
			
			if (isMoney(value)) {
				this._valueInCents = value._valueInCents;
			}
			else if (typeof value === 'number') {
				this._valueInCents = Math.round(value * DECIMAL_CONSTANTS.FACTOR)
			}
			else {
				throw new Error("The money setValue method was passed something other than a money object or number.");
			}
			
			return this;
		};
	
	//****************************************************************************************************
	// times
	//****************************************************************************************************
	//| ### times (value)
	//|
	//| Multiplies the money amount by the given numeric `value` and returns the result as a new money object.
	//|
	//| Examples:
	//|
	//| ```javascript
	//| money(24).times(10); // 240.00
	//|
	//| var orderAmount = money(100);
	//| var salesTaxRate = 0.05;
	//| orderAmount.times(salesTaxRate); // 5.00
	//| ```
	//----------------------------------------------------------------------------------------------------
	Money.prototype.times =
		function times (valueToMultiply) {
			if (typeof valueToMultiply !== 'number') {
				throw new Error("The money times method was passed something other than a number.");
			}
			
			return new this.constructor(Math.round(this._valueInCents * valueToMultiply));
		};
			
	//****************************************************************************************************
	// toString
	//****************************************************************************************************
	//| ### toString (symbol, negativeFormat, symbolPosition, thousandsSeparator, decimalSeparator)
	//|
	//| Returns a string which represents the money object's value.
	//|
	//| ##### Arguments
	//|
	//| * `symbol` *Optional* - A character that denotes the type of currency. For example, the symbol for U.S. dollars
	//| is "$". Pass a null string for no symbol. If not given, the default value is used. The inital default symbol
	//| is set to "$". To change the default symbol or to pass it to this method when specifying a subsequent argument
	//| (like decimalSeparator), see the **defaults.currencySymbol()** module function.
	//|
	//| * `negativeFormat` *Optional* - Specifies whether to indicate a negative value with a minus sign or parentheses.
	//| See the **NEGATIVE\_FORMATS** constants. If not given, the default value is used. The inital default is to use a minus
	//| sign. To change the default or to pass it to this method when specifying a subsequent argument (like decimalSeparator),
	//| see the **defaults.negativeFormat()** module function.
	//|
	//| * `symbolPosition` *Optional* - Specifies where the currency symbol should appear. See the **SYMBOL\_POSITIONS** constants.
	//| If not given, the default value is used. The inital default is to place the symbol in the front of the returned string.
	//| To change the default or to pass it to this method when specifying a subsequent argument (like decimalSeparator),
	//| see the **defaults.symbolPosition()** module function.
	//|
	//| * `thousandsSeparator` *Optional* - A character used to separate groups of 3 digits. For example, if the character is
	//| a comma, then a monetary amount of 12345.00 would return "12,345.00". If not given, the default value is used. The inital
	//| default separator is set to a comma ",". To change the default separator or to pass it to this method when specifying a
	//| subsequent argument (like decimalSeparator), see the **defaults.thousandsSeparator()** module function.
	//|
	//| * `decimalSeparator` *Optional* - A character used to separate the integer and decimal parts of the monetary amount.
	//| For example, if the character is a period, then a monetary amount of 12 would return "12.00". If not given, the default
	//| value is used. The inital default separator is set to a period ".". To change the default separator, see the
	//| **defaults.decimalSeparator()** module function.
	//|
	//| ##### Setting Formatting Without Passing Arguments
	//|
	//| **toString()** can call a function defined by the **setFormatFunction()** module function to set one or more of the
	//| formatting defaults each time **toString()** is called. This facilitates applying different formatting depending on
	//| the current calling environment. For example, **toString()** may be called for different users with
	//| different money format preferences. The function passed to **setFormatFunction()** can determine the correct format preferences
	//| for each user and pass them back to **toString()**. See the **setFormatFunction()** module function.
	//|
	//| Examples:
	//|
	//| ```javascript
	//| var price = money(19.95);
	//| price.toString(); // '$19.95'
	//| price.toString(''); // '19.95'
	//| price.toString('$', money.NEGATIVE_FORMATS.MINUS_SIGN, money.SYMBOL_POSITIONS.AFTER, '.', ','); // '19,95$'
	//|
	//| money.defaults.currencySymbol(''); // default is no currency symbol
	//| price.toString(); // '19.95'
	//| ```
	//----------------------------------------------------------------------------------------------------
	Money.prototype.toString =
		function toString (symbol, negativeFormat, symbolPosition, thousandsSeparator, decimalSeparator) {
			var backSymbol;
			var formats;
			var frontParenthesis;
			var frontSymbol;
			var negativeSign;
			var number;
			var i;
			var j;
			var rearParenthesis;
			var resultString;
			var useNegativeParentheses;
			
			formats = typeof getFormat === 'function' ? getFormat() : {};
			
			formats.negativeFormat 		= typeof formats.negativeFormat === 'string' && NEGATIVE_FORMATS.hasOwnProperty(formats.negativeFormat) ? formats.negativeFormat : defaultNegativeFormat;
			formats.symbol 				= typeof formats.symbol === 'string' ? formats.symbol : defaultSymbol;
			formats.symbolPosition 		= typeof formats.symbolPosition === 'string' && SYMBOL_POSITIONS.hasOwnProperty(formats.symbolPosition) ? formats.symbolPosition : defaultSymbolPosition;
			formats.thousandsSeparator 	= typeof formats.thousandsSeparator === 'string' ? formats.thousandsSeparator : defaultThousandsSeparator;
			formats.decimalSeparator 	= typeof formats.decimalSeparator === 'string' ? formats.decimalSeparator : defaultDecimalSeparator;

			negativeFormat 		= typeof negativeFormat === 'string' && NEGATIVE_FORMATS.hasOwnProperty(negativeFormat) ? negativeFormat : formats.negativeFormat;
			symbol 				= typeof symbol === 'string' ? symbol : formats.symbol;
			symbolPosition 		= typeof symbolPosition === 'string' && SYMBOL_POSITIONS.hasOwnProperty(symbolPosition) ? symbolPosition : formats.symbolPosition;
			thousandsSeparator 	= typeof thousandsSeparator === 'string' ? thousandsSeparator : formats.thousandsSeparator;
			decimalSeparator 	= typeof decimalSeparator === 'string' ? decimalSeparator : formats.decimalSeparator;
			
			number = this.getValue(); 
			
			negativeSign = number < 0 && negativeFormat === NEGATIVE_FORMATS.MINUS_SIGN ? '-' : '';
			
			useNegativeParentheses = number < 0 && negativeFormat === NEGATIVE_FORMATS.PARENTHESES;
			frontParenthesis = useNegativeParentheses ? '(' : '';
			rearParenthesis = useNegativeParentheses ? ')' : '';
			
			frontSymbol = symbolPosition === SYMBOL_POSITIONS.BEFORE ? symbol : '';
			backSymbol = symbolPosition === SYMBOL_POSITIONS.AFTER ? symbol : '';

			i = parseInt(number = Math.abs(+number || 0).toFixed(DECIMAL_CONSTANTS.PLACES), 10) + '';
			j = (j = i.length) > 3 ? j % 3 : 0;
			   
			resultString =
				negativeSign + frontSymbol + frontParenthesis + (j ? i.substr(0, j) + thousandsSeparator : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, '$1' + thousandsSeparator) +
				(DECIMAL_CONSTANTS.PLACES ? decimalSeparator + Math.abs(number - i).toFixed(DECIMAL_CONSTANTS.PLACES).slice(2) : '') + rearParenthesis + backSymbol;
				
			return resultString;
		};

	//****************************************************************************************************
	//|
	//| Module Functions
	//| ----------------
	//****************************************************************************************************

	//****************************************************************************************************
	// defaults.currencySymbol
	//****************************************************************************************************
	//| ### defaults.currencySymbol (symbol)
	//|
	//| Returns the default currency symbol when calling the **toString()** method. If the optional `symbol`
	//| string argument is passed, sets the default currency symbol to the argument's value. The initial
	//| default value is "$".
	//|
	//| Examples:
	//|
	//| ```javascript
	//| money.defaults.currencySymbol(); // '$'
	//| money.defaults.currencySymbol(''); // '', do not use a currency symbol by default
	//| ```
	//----------------------------------------------------------------------------------------------------
	defaults.currencySymbol =
		function currencySymbol (symbol) {
			if (typeof symbol === 'string') {
				defaultSymbol = symbol;
			}
			
			return defaultSymbol;
		};
	
	//****************************************************************************************************
	// defaults.decimalSeparator
	//****************************************************************************************************
	//| ### defaults.decimalSeparator (separator)
	//|
	//| Returns the default decimal separator (a character used to separate the integer and decimal parts
	//| of a monetary amount) when calling the **toString()** method. For example, if the character is a
	//| period, then a monetary amount of 12 would return "12.00" from **toString()**. If the optional
	//| `separator` string argument is passed, sets the default separator to the argument's value. The
	//| initial default value is a period ".".
	//|
	//| Examples:
	//|
	//| ```javascript
	//| money.defaults.decimalSeparator(); // '.'
	//| money.defaults.decimalSeparator(','); // ','
	//| ```
	//----------------------------------------------------------------------------------------------------
	defaults.decimalSeparator =
		function decimalSeparator (separator) {
			if (typeof separator === 'string') {
				defaultDecimalSeparator = separator;
			}
			
			return defaultDecimalSeparator;
		};
	
	//****************************************************************************************************
	// defaults.negativeFormat
	//****************************************************************************************************
	//| ### defaults.negativeFormat (format)
	//|
	//| Returns the default negative format when calling the **toString()** method. If the optional `format`
	//| argument is passed, sets the default format to the argument's value. See the **NEGATIVE\_FORMATS**
	//| constants for valid values. The initial default value is **NEGATIVE\_FORMATS.MINUS_SIGN**
	//|
	//| Examples:
	//|
	//| ```javascript
	//| money.defaults.negativeFormat(); // money.NEGATIVE_FORMATS.MINUS_SIGN
	//| money.defaults.negativeFormat(money.NEGATIVE_FORMATS.PARENTHESES); // money.NEGATIVE_FORMATS.PARENTHESES
	//| ```
	//----------------------------------------------------------------------------------------------------
	defaults.negativeFormat =
		function negativeFormat (format) {
			if (typeof format === 'string' && NEGATIVE_FORMATS.hasOwnProperty(format)) {
				defaultNegativeFormat = format;
			}
			
			return defaultNegativeFormat;
		};
	
	//****************************************************************************************************
	// defaults.symbolPosition
	//****************************************************************************************************
	//| ### defaults.symbolPosition (position)
	//|
	//| Returns the default symbol position when calling the **toString()** method. If the optional `position`
	//| argument is passed, sets the default position to the argument's value. See the **SYMBOL\_POSITIONS**
	//| constants for valid values. The initial default value is **SYMBOL\_POSITIONS.BEFORE**.
	//|
	//| Examples:
	//|
	//| ```javascript
	//| money.defaults.symbolPosition(); // money.SYMBOL_POSITIONS.BEFORE
	//| money.defaults.symbolPosition(money.SYMBOL_POSITIONS.AFTER); // money.SYMBOL_POSITIONS.AFTER
	//| ```
	//----------------------------------------------------------------------------------------------------
	defaults.symbolPosition =
		function symbolPosition (position) {
			if (typeof position === 'string' && SYMBOL_POSITIONS.hasOwnProperty(position)) {
				defaultSymbolPosition = position;
			}
			
			return defaultSymbolPosition;
		};
	
	//****************************************************************************************************
	// defaults.thousandsSeparator
	//****************************************************************************************************
	//| ### defaults.thousandsSeparator (separator)
	//|
	//| Returns the default thousands separator (a character used to separate groups of 3 digits) when
	//| calling the **toString()** method. For example, if the character is a comma, then a monetary amount
	//| of 12345.00 would return "12,345.00" from **toString()**. If the optional `separator` string
	//| argument is passed, sets the default separator to the argument's value. The initial
	//| default value is a comma ",".
	//|
	//| Examples:
	//|
	//| ```javascript
	//| money.defaults.thousandsSeparator(); // ','
	//| money.defaults.thousandsSeparator('.'); // '.'
	//| ```
	//----------------------------------------------------------------------------------------------------
	defaults.thousandsSeparator =
		function thousandsSeparator (separator) {
			if (typeof separator === 'string') {
				defaultThousandsSeparator = separator;
			}
			
			return defaultThousandsSeparator;
		};

	//****************************************************************************************************
	// isMoney
	//****************************************************************************************************
	//| ### isMoney (object)
	//|
	//| Returns *true* if the given `object` is an instance of a money object and returns *false*
	//| otherwise.
	//|
	//| Examples:
	//|
	//| ```javascript
	//| var price = money(19.95);
	//| money.isMoney(price); // true
	//| money.isMoney(19.95); // false
	//| ```
	//----------------------------------------------------------------------------------------------------
	isMoney =
		function isMoney (object) {
			return object instanceof Money;
		};

	//****************************************************************************************************
	// setFormatFunction
	//****************************************************************************************************
	//| ### setFormatFunction (formatFunction)
	//|
	//| Sets a function to be called each time the **toString()** method is called to set defaults for the
	//| format. This facilitates applying different formatting depending on the current calling environment.
	//| For example, **toString()** may be called for different users with different money
	//| format preferences. The function passed to **setFormatFunction()** can determine the correct format
	//| preferences for each user and pass them back to **toString()**.
	//|
	//| `formatFunction` should return an object containing one or more of the following properties:
	//|
	//| * `symbol` *Optional* - A character that denotes the type of currency. Example: '$'.
	//|
	//| * `negativeFormat` *Optional* - Specifies whether to indicate a negative value with a minus sign
	//| or parentheses. See the **NEGATIVE\_FORMATS** constants. Example: money.NEGATIVE_FORMATS.PARENTHESES.
	//|
	//| * `symbolPosition` *Optional* - Specifies where the currency symbol should appear. See the
	//| **SYMBOL\_POSITIONS** constants. Example: money.SYMBOL_POSITIONS.AFTER.
	//|
	//| * `thousandsSeparator` *Optional* - A character used to separate groups of 3 digits. For example,
	//| if the character is a comma, then **money(12345).toString()** would return "12,345.00".
	//|
	//| * `decimalSeparator` *Optional* - A character used to separate the integer and decimal parts of
	//| the monetary amount. For example, if the character is a period, then **money(12).toString()** would
	//| return "12.00".
	//|
	//| Examples:
	//|
	//| ```javascript
	//| money.setFormatFunction (
	//| 	function () {
	//| 		// This is just an example. Normally, this function would return something other than static values.
	//|
	//| 		return {	symbol 				: '$',
	//| 					negativeFormat 		: money.NEGATIVE_FORMATS.PARENTHESES,
	//| 					symbolPosition 		: money.SYMBOL_POSITIONS.AFTER,
	//| 					thousandsSeparator 	: '.',
	//| 					decimalSeparator 	: ','
	//| 			   };
	//| 	});
	//| 
	//| var netProfit = money(-12345.67);
	//| netProfit.toString(); // '(12.345,67)$'
	//| netProfit.toString('', money.NEGATIVE_FORMATS.MINUS_SIGN); // '-$12.345,67' (override symbol and negative format)
	//| ```
	//----------------------------------------------------------------------------------------------------
	setFormatFunction =
		function setFormatFunction (formatFunction) {
			getFormat = formatFunction;
		};
		
	//****************************************************************************************************
	// sum
	//****************************************************************************************************
	//| ### sum (values)
	//|
	//| Returns a money object representing the sum of the given array of `values`. Each value in the
	//| array can be a number or a money object. Each numeric value is treated as a monetary value by
	//| converting it to a money object before adding it to the total.
	//|
	//| Examples:
	//|
	//| ```javascript
	//| var expenses = [money(10), money(20), 30.345];
	//| money.sum(expenses); // 60.35
	//| ```
	//----------------------------------------------------------------------------------------------------
	sum =
		function sum (values) {
			var result = moneyMaker(0);
			
			for (i = 0; i < values.length; i++) {
				result.setValue(result.plus(values[i]));
			}
			
			return result;
		};
		
	//----------------------------------------------------------------------------------------------------
	//|
	//| Constants
	//| ---------
	//| ### NEGATIVE\_FORMATS
	//| * MINUS\_SIGN - Use a minus sign for negative monetary amounts when calling **toString()**.
	//| * PARENTHESES - Use parentheses for negative monetary amounts when calling **toString()**.
	//|
	//| Examples:
	//|
	//| ```javascript
	//| var debit = money(-25.34);
	//| debit.toString('$', money.NEGATIVE_FORMATS.MINUS_SIGN); // '-$25.34'
	//| debit.toString('$', money.NEGATIVE_FORMATS.PARENTHESES); // '$(25.34)'
	//| ```
	//|
	//| ### SYMBOL\_POSITIONS
	//| * AFTER - Place the currency symbol at the end when calling **toString()**.
	//| * BEFORE - Place the currency symbol in the front when calling **toString()**.
	//|
	//| Examples:
	//|
	//| ```javascript
	//| var price = money(25);
	//| price.toString(); // '$25.00'
	//|
	//| money.defaults.symbolPosition(money.SYMBOL_POSITIONS.AFTER);
	//| price.toString(); // '25.00$'
	//| ```
	//----------------------------------------------------------------------------------------------------
		
	//****************************************************************************************************
	// Set this module's public interface.
	//****************************************************************************************************
	moneyMaker.defaults 			= defaults;
	moneyMaker.isMoney 				= isMoney;
	moneyMaker.NEGATIVE_FORMATS 	= NEGATIVE_FORMATS;
	moneyMaker.setFormatFunction 	= setFormatFunction;
	moneyMaker.sum 					= sum;
	moneyMaker.SYMBOL_POSITIONS 	= SYMBOL_POSITIONS;
	
	Object.freeze(moneyMaker);
	
	return moneyMaker;
});
