//****************************************************************************************************
// MODULE: money
//****************************************************************************************************
//----------------------------------------------------------------------------------------------------
({define: typeof define === 'function' ? define : function (A,F) {var I = F.apply(null, A.map(require)); Object.keys(I).forEach(function(k) {exports[k] = I[k];});}}).define(

[], // No module dependencies.


function () {
	"use strict";
	
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
	var publicInterface;
	var setFormatFunction;
	var sum;
	var SYMBOL_POSITIONS;

	//****************************************************************************************************
	// Constants
	//****************************************************************************************************
	//----------------------------------------------------------------------------------------------------
		
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
	//****************************************************************************************************

	//****************************************************************************************************
	// abs
	//****************************************************************************************************
	//----------------------------------------------------------------------------------------------------
	Money.prototype.abs =
		function abs (value) {
			return new this.constructor(Math.abs(this._valueInCents));
		};
	
	//****************************************************************************************************
	// dividedBy
	//****************************************************************************************************
	//----------------------------------------------------------------------------------------------------
	Money.prototype.dividedBy =
		function dividedBy (divisor) {
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
	//----------------------------------------------------------------------------------------------------
	Money.prototype.getValue =
		function getValue () {
			return this._valueInCents / DECIMAL_CONSTANTS.FACTOR;
		};
	
	//****************************************************************************************************
	// isEqualTo
	//****************************************************************************************************
	//----------------------------------------------------------------------------------------------------
	Money.prototype.isEqualTo =
		function isEqualTo (valueToCompare) {
			return this._valueInCents === moneyMaker(valueToCompare)._valueInCents;
		};
	
	//****************************************************************************************************
	// isGreaterThan
	//****************************************************************************************************
	//----------------------------------------------------------------------------------------------------
	Money.prototype.isGreaterThan =
		function isGreaterThan (valueToCompare) {
			return this._valueInCents > moneyMaker(valueToCompare)._valueInCents;
		};
	
	//****************************************************************************************************
	// isGreaterThanOrEqualTo
	//****************************************************************************************************
	//----------------------------------------------------------------------------------------------------
	Money.prototype.isGreaterThanOrEqualTo =
		function isGreaterThanOrEqualTo (valueToCompare) {
			return this._valueInCents >= moneyMaker(valueToCompare)._valueInCents;
		};
	
	//****************************************************************************************************
	// isLessThan
	//****************************************************************************************************
	//----------------------------------------------------------------------------------------------------
	Money.prototype.isLessThan =
		function isLessThan (valueToCompare) {
			return this._valueInCents < moneyMaker(valueToCompare)._valueInCents;
		};
	
	//****************************************************************************************************
	// isLessThanOrEqualTo
	//****************************************************************************************************
	//----------------------------------------------------------------------------------------------------
	Money.prototype.isLessThanOrEqualTo =
		function isLessThanOrEqualTo (valueToCompare) {
			return this._valueInCents <= moneyMaker(valueToCompare)._valueInCents;
		};
			
	//****************************************************************************************************
	// minus
	//****************************************************************************************************
	//----------------------------------------------------------------------------------------------------
	Money.prototype.minus =
		function minus (valueToSubtract) {
			return new this.constructor(this._valueInCents - moneyMaker(valueToSubtract)._valueInCents);
		};
	
	//****************************************************************************************************
	// negate
	//****************************************************************************************************
	//----------------------------------------------------------------------------------------------------
	Money.prototype.negate =
		function negate () {
			return new this.constructor(-this._valueInCents);
		};
	
	//****************************************************************************************************
	// plus
	//****************************************************************************************************
	//----------------------------------------------------------------------------------------------------
	Money.prototype.plus =
		function plus (valueToAdd) {
			return new this.constructor(this._valueInCents + moneyMaker(valueToAdd)._valueInCents);
		};
	
	//****************************************************************************************************
	// setValue
	//****************************************************************************************************
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
	//****************************************************************************************************

	//****************************************************************************************************
	// defaults.currencySymbol
	//****************************************************************************************************
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
	//----------------------------------------------------------------------------------------------------
	isMoney =
		function isMoney (object) {
			return object instanceof Money;
		};

	//****************************************************************************************************
	// setFormatFunction
	//****************************************************************************************************
	//----------------------------------------------------------------------------------------------------
	setFormatFunction =
		function setFormatFunction (formatFunction) {
			getFormat = formatFunction;
		};
		
	//****************************************************************************************************
	// sum
	//****************************************************************************************************
	//----------------------------------------------------------------------------------------------------
	sum =
		function sum (values) {
			var i;
			var result = moneyMaker(0);
			
			for (i = 0; i < values.length; i++) {
				result.setValue(result.plus(values[i]));
			}
			
			return result;
		};
		
	//****************************************************************************************************
	// Set this module's public interface.
	//****************************************************************************************************
	publicInterface = {};

	publicInterface.defaults 			= defaults;
	publicInterface.isMoney 			= isMoney;
	publicInterface.make				= moneyMaker;
	publicInterface.NEGATIVE_FORMATS 	= NEGATIVE_FORMATS;
	publicInterface.setFormatFunction 	= setFormatFunction;
	publicInterface.sum 				= sum;
	publicInterface.SYMBOL_POSITIONS 	= SYMBOL_POSITIONS;
	
	return publicInterface;
});

//****************************************************************************************************
//****************************************************************************************************
//****************************************************************************************************
//****************************************************************************************************
//----------------------------------------------------------------------------------------------------

//****************************************************************************************************
//****************************************************************************************************

