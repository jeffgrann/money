"use strict";

({define: typeof define === 'function' ? define : function (A,F) {var I = F.apply(null, A.map(require)); Object.keys(I).forEach(function(k) {exports[k] = I[k];});}}).define(

['money'],

function (money) {
	var areClose;
	var getMoneyFormat;
	var publicInterface = {};
				
	areClose = function areClose (a, b) {
		return Math.abs(a - b) < 0.000001;
	};
	
	getMoneyFormat = function getMoneyFormat () {
		return {symbol				: '%',
				negativeFormat		: money.NEGATIVE_FORMATS.PARENTHESES,
				symbolPosition		: money.SYMBOL_POSITIONS.AFTER,
				thousandsSeparator 	: '.',
				decimalSeparator	: ','};
	}
		    	
	publicInterface.get = function getTestCases () {
		var testCases = {
		    name: "money Tests",
		     
			//----------------------------------------------------------------------------------------------------
			// abs
			//----------------------------------------------------------------------------------------------------
			'test abs': function() {
					Y.Assert.isTrue(areClose(money.make(-21.67).abs().getValue(), 21.67), "absolute value of a negative money amount");
					Y.Assert.isTrue(areClose(money.make(21.67).abs().getValue(), 21.67), "absolute value of a positive money amount");
					Y.Assert.areSame(money.make(0).abs().getValue(), 0, "absolute value of a 0 money amount");
		        },

			//----------------------------------------------------------------------------------------------------
			// dividedBy
			//----------------------------------------------------------------------------------------------------
			'test dividedBy': function() {
					Y.Assert.isTrue(areClose(money.make(21.67).dividedBy(5).getValue(), 4.33), "divide a money value by a number");
					Y.Assert.isTrue(areClose(money.make(21.67).dividedBy(money.make(5)), 4.334), "divide a money value by a money value");
		        },

			//----------------------------------------------------------------------------------------------------
			// getValue
			//----------------------------------------------------------------------------------------------------
			'test getValue': function() {
					Y.Assert.isTrue(areClose(money.make(13.08).getValue(), 13.08), "get a money value");
					Y.Assert.isTrue(areClose(money.make(13.084444).getValue(), 13.08), "get a money value from a number that was rounded down");
					Y.Assert.isTrue(areClose(money.make(13.085).getValue(), 13.09), "get a money value from a number that was rounded up");
		        },

			//----------------------------------------------------------------------------------------------------
			// isEqualTo
			//----------------------------------------------------------------------------------------------------
			'test isEqualTo': function() {
					Y.Assert.isFalse(money.make(21.67).isEqualTo(money.make(21.68)), "check for equality for values that are not equal");
					Y.Assert.isTrue(money.make(21.67).isEqualTo(21.67), "check for equality for values that are equal");
					Y.Assert.isTrue(money.make(21.67).plus(money.make(14.59)).times(17).minus(money.make(11.21)).isEqualTo(money.make(605.21)), "check for equality for calculated values that are equal");

					Y.Assert.isFalse(money.make(34.67).times(403).plus(money.make(107.61)).isEqualTo(money.make(14079.61)),
									 "check for equality for calculated values that are not equal by 1 cent too little");

					Y.Assert.isFalse(money.make(34.67).times(403).plus(money.make(107.61)).isEqualTo(money.make(14079.63)),
									 "check for equality for calculated values that are not equal by 1 cent too much");
		        },

			//----------------------------------------------------------------------------------------------------
			// isGreaterThan
			//----------------------------------------------------------------------------------------------------
			'test isGreaterThan': function() {
					Y.Assert.isFalse(money.make(21.67).isGreaterThan(money.make(21.67)), "check values that are equal");
					Y.Assert.isTrue(money.make(21.67).isGreaterThan(21.66), "check value is greater than");
					Y.Assert.isFalse(money.make(21.67).isGreaterThan(money.make(21.68)), "check value is less than");
		        },

			//----------------------------------------------------------------------------------------------------
			// isGreaterThanOrEqualTo
			//----------------------------------------------------------------------------------------------------
			'test isGreaterThanOrEqualTo': function() {
					Y.Assert.isTrue(money.make(21.67).isGreaterThanOrEqualTo(money.make(21.67)), "check values that are equal");
					Y.Assert.isTrue(money.make(21.67).isGreaterThanOrEqualTo(21.66), "check value is greater than");
					Y.Assert.isFalse(money.make(21.67).isGreaterThanOrEqualTo(money.make(21.68)), "check value is less than");
		        },

			//----------------------------------------------------------------------------------------------------
			// isLessThan
			//----------------------------------------------------------------------------------------------------
			'test isLessThan': function() {
					Y.Assert.isFalse(money.make(21.67).isLessThan(money.make(21.67)), "check values that are equal");
					Y.Assert.isFalse(money.make(21.67).isLessThan(21.66), "check value is greater than");
					Y.Assert.isTrue(money.make(21.67).isLessThan(money.make(21.68)), "check value is less than");
		        },

			//----------------------------------------------------------------------------------------------------
			// isLessThanOrEqualTo
			//----------------------------------------------------------------------------------------------------
			'test isLessThanOrEqualTo': function() {
					Y.Assert.isTrue(money.make(21.67).isLessThanOrEqualTo(money.make(21.67)), "check values that are equal");
					Y.Assert.isFalse(money.make(21.67).isLessThanOrEqualTo(21.66), "check value is greater than");
					Y.Assert.isTrue(money.make(21.67).isLessThanOrEqualTo(money.make(21.68)), "check value is less than");
		        },

			//----------------------------------------------------------------------------------------------------
			// minus
			//----------------------------------------------------------------------------------------------------
			'test minus': function() {
					Y.Assert.isTrue(areClose(money.make(21.67).minus(13.08).getValue(), 8.59), "subtract a number from a money value");
					Y.Assert.isTrue(areClose(money.make(21.67).minus(money.make(13.08)).getValue(), 8.59), "subtract a money value from a money value");
		        },

			//----------------------------------------------------------------------------------------------------
			// plus
			//----------------------------------------------------------------------------------------------------
			'test plus': function() {
					Y.Assert.isTrue(areClose(money.make(21.67).plus(13.08).getValue(), 34.75), "add a money value to a number");
					Y.Assert.isTrue(areClose(money.make(21.67).plus(money.make(13.08)).getValue(), 34.75), "add 2 money values");
		        },

			//----------------------------------------------------------------------------------------------------
			// setValue
			//----------------------------------------------------------------------------------------------------
			'test setValue': function() {
					Y.Assert.isTrue(areClose(money.make().setValue(13.08).getValue(), 13.08), "set a money value to a number");
					Y.Assert.isTrue(areClose(money.make().setValue(13.084444).getValue(), 13.08), "set a money value to a number that is rounded down");
					Y.Assert.isTrue(areClose(money.make().setValue(13.085).getValue(), 13.09), "set a money value to a number that is rounded up");
					Y.Assert.isTrue(areClose(money.make().setValue(money.make(45.67)).getValue(), 45.67), "set a money value to another money value");
		        },

			//----------------------------------------------------------------------------------------------------
			// sum
			//----------------------------------------------------------------------------------------------------
			'test sum': function() {
					Y.Assert.isTrue(areClose(money.sum([12.45, money.make(16.28), 0.45, 101.23, money.make(12.34), 67.38]).getValue(), 210.13), "sum an array of money values and numbers");
					Y.Assert.isTrue(areClose(money.sum([12.45, money.make(-16.28), 0.45, 101.23, money.make(12.34), -67.38]).getValue(), 42.81), "sum an array of money values and numbers with negatives");
		        },

			//----------------------------------------------------------------------------------------------------
			// times
			//----------------------------------------------------------------------------------------------------
			'test times': function() {
					Y.Assert.isTrue(areClose(money.make(21.67).times(13.78394).getValue(), 298.70), "multiply a money value by a number with a fraction");
		        },

			//----------------------------------------------------------------------------------------------------
			// toString
			//----------------------------------------------------------------------------------------------------
			'test toString': function() {
					Y.Assert.areSame(money.make(1822456.34).toString(), '$1,822,456.34', "using all defaults");
					Y.Assert.areSame(money.make(-1822456.34).toString(), '-$1,822,456.34', "using all defaults with a negative value");
					Y.Assert.areSame(money.make(0).toString(), '$0.00', "using all defaults with a value of 0");
					Y.Assert.areSame(money.make(1822456.34).toString('€'), '€1,822,456.34', "specifying a currency symbol");
					Y.Assert.areSame(money.make(1822456.34).toString(''), '1,822,456.34', "specifying no currency symbol");
					
					Y.Assert.areSame(money.make(1822456.34).toString(money.defaults.currencySymbol(), money.NEGATIVE_FORMATS.PARENTHESES),
									 '$1,822,456.34',
									 "parentheses for negative amounts with a positive amount");
					
					Y.Assert.areSame(money.make(-1822456.34).toString(money.defaults.currencySymbol(), money.NEGATIVE_FORMATS.PARENTHESES),
									 '$(1,822,456.34)',
									 "parentheses for negative amounts with a negative amount");
					
					Y.Assert.areSame(money.make(0).toString(money.defaults.currencySymbol(), money.NEGATIVE_FORMATS.PARENTHESES),
									 '$0.00',
									 "parentheses for negative amounts with a zero amount");
					
					Y.Assert.areSame(money.make(2387).toString(money.defaults.currencySymbol(), money.defaults.negativeFormat(), money.SYMBOL_POSITIONS.BEFORE), '$2,387.00', "symbol at front");
					Y.Assert.areSame(money.make(2387).toString(money.defaults.currencySymbol(), money.defaults.negativeFormat(), money.SYMBOL_POSITIONS.AFTER), '2,387.00$', "symbol at rear");
					Y.Assert.areSame(money.make(2387).toString(money.defaults.currencySymbol(), money.defaults.negativeFormat(), money.defaults.symbolPosition(), ' '), '$2 387.00', "thousands separator");
					
					Y.Assert.areSame(money.make(2387).toString(money.defaults.currencySymbol(),
															   money.defaults.negativeFormat(),
															   money.defaults.symbolPosition(),
															   money.defaults.thousandsSeparator(),
															   ' - '),
									 '$2,387 - 00',
									 "decimal separator");
									
					money.setFormatFunction(getMoneyFormat);
					Y.Assert.areSame(money.make(-2387).toString(), '(2.387,00)%', "getFormat function");
					money.setFormatFunction(undefined);

					money.setFormatFunction(getMoneyFormat);
					Y.Assert.areSame(money.make(-2387).toString(''), '(2.387,00)', "override getFormat function symbol");
					money.setFormatFunction(undefined);

					money.setFormatFunction(getMoneyFormat);
					Y.Assert.areSame(money.make(-2387).toString(undefined, money.NEGATIVE_FORMATS.MINUS_SIGN), '-2.387,00%', "override getFormat function negative format");
					money.setFormatFunction(undefined);

					money.defaults.currencySymbol('€');
					money.defaults.symbolPosition(money.SYMBOL_POSITIONS.AFTER);
					money.defaults.decimalSeparator(',');
					money.defaults.thousandsSeparator('.');
					money.defaults.negativeFormat(money.NEGATIVE_FORMATS.PARENTHESES);
					Y.Assert.areSame(money.make(-2387).toString(), '(2.387,00)€', "default settings");

					money.defaults.currencySymbol('¥');
					money.defaults.symbolPosition(money.SYMBOL_POSITIONS.BEFORE);
					money.defaults.decimalSeparator('.');
					money.defaults.thousandsSeparator(',');
					money.defaults.negativeFormat(money.NEGATIVE_FORMATS.MINUS_SIGN);
					Y.Assert.areSame(money.make(-2387).toString(money.defaults.currencySymbol(),
																money.defaults.negativeFormat(),
																money.defaults.symbolPosition(),
																money.defaults.thousandsSeparator(),
																money.defaults.decimalSeparator()),
									 '-¥2,387.00',
									 "all default settings passed in");
		        }
	    };
	    
	    return testCases;
	};
	
	return publicInterface;
});
