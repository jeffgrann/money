	(function () {
		var precision = 6;
				
		//----------------------------------------------------------------------------------------------------
		// abs
		//----------------------------------------------------------------------------------------------------
		describe("abs", function() {
		    it("absolute value of a negative money amount", function() {
		        expect(money(-21.67).abs().getValue()).toBeCloseTo(21.67, precision);
			});

		    it("absolute value of a positive money amount", function() {
		        expect(money(21.67).abs().getValue()).toBeCloseTo(21.67, precision);
			});

		    it("absolute value of a 0 money amount", function() {
		        expect(money(0).abs().getValue()).toBe(0);
			});
		});

		//----------------------------------------------------------------------------------------------------
		// dividedBy
		//----------------------------------------------------------------------------------------------------
		describe("dividedBy", function() {
		    it("divide a money value by a number", function() {
		        expect(money(21.67).dividedBy(5).getValue()).toBeCloseTo(4.33, precision);
			});

		    it("divide a money value by a money value", function() {
		        expect(money(21.67).dividedBy(money(5))).toBeCloseTo(4.334, precision);
			});
		});

		//----------------------------------------------------------------------------------------------------
		// getValue
		//----------------------------------------------------------------------------------------------------
		describe("getValue", function() {
		    it("get a money value", function() {
		        expect(money(13.08).getValue()).toBeCloseTo(13.08, precision);
			});

		    it("get a money value from a number that was rounded down", function() {
		        expect(money(13.084444).getValue()).toBeCloseTo(13.08, precision);
			});

		    it("get a money value from a number that was rounded up", function() {
		        expect(money(13.085).getValue()).toBeCloseTo(13.09, precision);
			});
		});

		//----------------------------------------------------------------------------------------------------
		// isEqualTo
		//----------------------------------------------------------------------------------------------------
		describe("isEqualTo", function() {
		    it("check for equality for values that are not equal", function() {
		        expect(money(21.67).isEqualTo(money(21.68))).toBe(false);
			});

		    it("check for equality for values that are equal", function() {
		        expect(money(21.67).isEqualTo(21.67)).toBe(true);
			});

		    it("check for equality for calculated values that are equal", function() {
		        expect(money(21.67).plus(money(14.59)).times(17).minus(money(11.21)).isEqualTo(money(605.21))).toBe(true);
			});

		    it("check for equality for calculated values that are not equal by 1 cent too little", function() {
		        expect(money(34.67).times(403).plus(money(107.61)).isEqualTo(money(14079.61))).toBe(false);
			});

		    it("check for equality for calculated values that are not equal by 1 cent too much", function() {
		        expect(money(34.67).times(403).plus(money(107.61)).isEqualTo(money(14079.63))).toBe(false);
			});
		});

		//----------------------------------------------------------------------------------------------------
		// isGreaterThan
		//----------------------------------------------------------------------------------------------------
		describe("isGreaterThan", function() {
		    it("check values that are equal", function() {
		        expect(money(21.67).isGreaterThan(money(21.67))).toBe(false);
			});

		    it("check value is greater than", function() {
		        expect(money(21.67).isGreaterThan(21.66)).toBe(true);
			});

		    it("check value is less than", function() {
		        expect(money(21.67).isGreaterThan(money(21.68))).toBe(false);
			});
		});

		//----------------------------------------------------------------------------------------------------
		// isGreaterThanOrEqualTo
		//----------------------------------------------------------------------------------------------------
		describe("isGreaterThanOrEqualTo", function() {
		    it("check values that are equal", function() {
		        expect(money(21.67).isGreaterThanOrEqualTo(money(21.67))).toBe(true);
			});

		    it("check value is greater than", function() {
		        expect(money(21.67).isGreaterThanOrEqualTo(21.66)).toBe(true);
			});

		    it("check value is less than", function() {
		        expect(money(21.67).isGreaterThanOrEqualTo(money(21.68))).toBe(false);
			});
		});

		//----------------------------------------------------------------------------------------------------
		// isLessThan
		//----------------------------------------------------------------------------------------------------
		describe("isLessThan", function() {
		    it("check values that are equal", function() {
		        expect(money(21.67).isLessThan(money(21.67))).toBe(false);
			});

		    it("check value is greater than", function() {
		        expect(money(21.67).isLessThan(21.66)).toBe(false);
			});

		    it("check value is less than", function() {
		        expect(money(21.67).isLessThan(money(21.68))).toBe(true);
			});
		});

		//----------------------------------------------------------------------------------------------------
		// isLessThanOrEqualTo
		//----------------------------------------------------------------------------------------------------
		describe("isLessThanOrEqualTo", function() {
		    it("check values that are equal", function() {
		        expect(money(21.67).isLessThanOrEqualTo(money(21.67))).toBe(true);
			});

		    it("check value is greater than", function() {
		        expect(money(21.67).isLessThanOrEqualTo(21.66)).toBe(false);
			});

		    it("check value is less than", function() {
		        expect(money(21.67).isLessThanOrEqualTo(money(21.68))).toBe(true);
			});
		});

		//----------------------------------------------------------------------------------------------------
		// minus
		//----------------------------------------------------------------------------------------------------
		describe("minus", function() {
		    it("subtract a number from a money value", function() {
		        expect(money(21.67).minus(13.08).getValue()).toBeCloseTo(8.59, precision);
			});

		    it("subtract a money value from a money value", function() {
		        expect(money(21.67).minus(money(13.08)).getValue()).toBeCloseTo(8.59, precision);
			});
		});

		//----------------------------------------------------------------------------------------------------
		// negate
		//----------------------------------------------------------------------------------------------------
		describe("negate", function() {
		    it("negate a positive amount", function() {
		        expect(money(21.67).negate().getValue()).toBeCloseTo(-21.67, precision);
			});

		    it("negate a negative amount", function() {
		        expect(money(-21.67).negate().getValue()).toBeCloseTo(21.67, precision);
			});

		    it("negate a zero amount", function() {
		        expect(money(0).negate().getValue()).toBe(0);
			});
		});

		//----------------------------------------------------------------------------------------------------
		// plus
		//----------------------------------------------------------------------------------------------------
		describe("plus", function() {
		    it("add a money value to a number", function() {
		        expect(money(21.67).plus(13.08).getValue()).toBeCloseTo(34.75, precision);
			});

		    it("add 2 money values", function() {
		        expect(money(21.67).plus(money(13.08)).getValue()).toBeCloseTo(34.75, precision);
			});
		});

		//----------------------------------------------------------------------------------------------------
		// setValue
		//----------------------------------------------------------------------------------------------------
		describe("setValue", function() {
		    it("set a money value to a number", function() {
		        expect(money().setValue(13.08).getValue()).toBeCloseTo(13.08, precision);
			});

		    it("set a money value to a number that is rounded down", function() {
		        expect(money().setValue(13.084444).getValue()).toBeCloseTo(13.08, precision);
			});

		    it("set a money value to a number that is rounded up", function() {
		        expect(money().setValue(13.085).getValue()).toBeCloseTo(13.09, precision);
			});

		    it("set a money value to another money value", function() {
		        expect(money().setValue(money(45.67)).getValue()).toBeCloseTo(45.67, precision);
			});
		});

		//----------------------------------------------------------------------------------------------------
		// sum
		//----------------------------------------------------------------------------------------------------
		describe("sum", function() {
		    it("sum an array of money values and numbers", function() {
		        expect(money.sum([12.45, money(16.28), 0.45, 101.23, money(12.34), 67.38]).getValue()).toBeCloseTo(210.13, precision);
			});

		    it("sum an array of money values and numbers with negatives", function() {
		        expect(money.sum([12.45, money(-16.28), 0.45, 101.23, money(12.34), -67.38]).getValue()).toBeCloseTo(42.81, precision);
			});
		});

		//----------------------------------------------------------------------------------------------------
		// times
		//----------------------------------------------------------------------------------------------------
		describe("times", function() {
		    it("multiply a money value by a number with a fraction", function() {
		        expect(money(21.67).times(13.78394).getValue()).toBeCloseTo(298.70, precision);
			});
		});

		//----------------------------------------------------------------------------------------------------
		// toString
		//----------------------------------------------------------------------------------------------------
		describe("toString", function() {
		    it("using all defaults", function() {
		        expect(money(1822456.34).toString()).toBe('$1,822,456.34');
			});
			
		    it("using all defaults with a negative value", function() {
		        expect(money(-1822456.34).toString()).toBe('-$1,822,456.34');
			});
			
		    it("using all defaults with a value of 0", function() {
		        expect(money(0).toString()).toBe('$0.00');
			});
			
		    it("specifying a currency symbol", function() {
		        expect(money(1822456.34).toString('€')).toBe('€1,822,456.34');
			});
			
		    it("specifying no currency symbol", function() {
		        expect(money(1822456.34).toString('')).toBe('1,822,456.34');
			});
			
		    it("parenteses for negative amounts with a positive amount", function() {
		        expect(money(1822456.34).toString(money.defaults.currencySymbol(), money.NEGATIVE_FORMATS.PARENTHESES)).toBe('$1,822,456.34');
			});
			
		    it("parenteses for negative amounts with a negative amount", function() {
		        expect(money(-1822456.34).toString(money.defaults.currencySymbol(), money.NEGATIVE_FORMATS.PARENTHESES)).toBe('$(1,822,456.34)');
			});
			
		    it("parenteses for negative amounts with a zero amount", function() {
		        expect(money(0).toString(money.defaults.currencySymbol(), money.NEGATIVE_FORMATS.PARENTHESES)).toBe('$0.00');
			});
			
		    it("symbol at front", function() {
		        expect(money(2387).toString(money.defaults.currencySymbol(), money.defaults.negativeFormat(), money.SYMBOL_POSITIONS.BEFORE)).toBe('$2,387.00');
			});
			
		    it("symbol at rear", function() {
		        expect(money(2387).toString(money.defaults.currencySymbol(), money.defaults.negativeFormat(), money.SYMBOL_POSITIONS.AFTER)).toBe('2,387.00$');
			});
			
		    it("thousands separator", function() {
		        expect(money(2387).toString(money.defaults.currencySymbol(), money.defaults.negativeFormat(), money.defaults.symbolPosition(), ' ')).toBe('$2 387.00');
			});
			
		    it("decimal separator", function() {
		        expect(money(2387).toString(money.defaults.currencySymbol(), money.defaults.negativeFormat(), money.defaults.symbolPosition(), money.defaults.thousandsSeparator(), ' - ')).toBe('$2,387 - 00');
			});
			
	    	function getMoneyFormat () {
	    		return {symbol				: '%',
	    				negativeFormat		: money.NEGATIVE_FORMATS.PARENTHESES,
	    				symbolPosition		: money.SYMBOL_POSITIONS.AFTER,
	    				thousandsSeparator 	: '.',
	    				decimalSeparator	: ','};
	    	}
		    	
		    it("getFormat function", function() {
				money.setFormatFunction(getMoneyFormat);
		        expect(money(-2387).toString()).toBe('(2.387,00)%');
		        money.setFormatFunction(undefined);
			});
			
		    it("override getFormat function symbol", function() {
				money.setFormatFunction(getMoneyFormat);
		        expect(money(-2387).toString('')).toBe('(2.387,00)');
		        money.setFormatFunction(undefined);
			});
			
		    it("override getFormat function negative format", function() {
				money.setFormatFunction(getMoneyFormat);
		        expect(money(-2387).toString(undefined, money.NEGATIVE_FORMATS.MINUS_SIGN)).toBe('-2.387,00%');
		        money.setFormatFunction(undefined);
			});
			
		    it("default settings", function() {
				money.defaults.currencySymbol('€');
				money.defaults.symbolPosition(money.SYMBOL_POSITIONS.AFTER);
				money.defaults.decimalSeparator(',');
				money.defaults.thousandsSeparator('.');
				money.defaults.negativeFormat(money.NEGATIVE_FORMATS.PARENTHESES);

		        expect(money(-2387).toString()).toBe('(2.387,00)€');
			});
			
		    it("all default settings passed in", function() {
				money.defaults.currencySymbol('¥');
				money.defaults.symbolPosition(money.SYMBOL_POSITIONS.BEFORE);
				money.defaults.decimalSeparator('.');
				money.defaults.thousandsSeparator(',');
				money.defaults.negativeFormat(money.NEGATIVE_FORMATS.MINUS_SIGN);

		        expect(money(-2387).toString(money.defaults.currencySymbol(), money.defaults.negativeFormat(), money.defaults.symbolPosition(), money.defaults.thousandsSeparator(), money.defaults.decimalSeparator())).toBe('-¥2,387.00');
			});
		});
	})();
