class Calculator {
  add(value) {
    if (!value) {
      return 0;
    }
    
    if (value.indexOf(',') !== -1) {
      let numbers = value.split(',');
  
      return parseInt(numbers[0]) + parseInt(numbers[1]);
    }
    
    return parseInt(value);
  }
}

module.exports = Calculator;