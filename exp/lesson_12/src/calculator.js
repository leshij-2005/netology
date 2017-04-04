class Calculator {
  constructor() {
    this._defaultValue = 0;
  }
  
  add(value) {
    if (!value) {
      return this._defaultValue;
    }
    
    if (this._isMultipleNumbers(value)) {
      return this._parseMultipleNumbers(value);
    }
    
    return this._parseNumber(value);
  }
  
  _parseNumber(value) {
    return parseInt(value, 10);
  }
  
  _isMultipleNumbers(value) {
    return value.indexOf(',') !== -1 || value.indexOf('\n') !== -1;
  }
  
  _parseMultipleNumbers(value) {
    const numbers = value.split(/[\n,]/);
    
    return numbers.reduce((a, b) => this._parseNumber(a) + this._parseNumber(b));
  }
}

module.exports = Calculator;