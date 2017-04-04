class Calculator {
  constructor() {
    this._defaultValue = 0;
  }
  
  add(value) {
    if (!value) {
      return this._defaultValue;
    }
    
    if (this._isMultipleNumbers(value)) {
      return this._parseMupltipleNumbers(value);
    }
    
    return this._parseNumber(value);
  }
  
  _parseNumber(value) {
    return parseInt(value, 10);
  }
  
  _isMultipleNumbers(value) {
    return value.indexOf(',') !== -1;
  }
  
  _parseMupltipleNumbers(value) {
    const numbers = value.split(',');
  
    return this._parseNumber(numbers[0]) + this._parseNumber(numbers[1]);
  }
}

module.exports = Calculator;