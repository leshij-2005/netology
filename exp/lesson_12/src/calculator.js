class Calculator {
  add(value) {
    if (!value) {
      return 0;
    }
    
    return parseInt(value);
  }
}

module.exports = Calculator;