const assert = require('chai').assert;
const Calculator = require('../src/calculator');

suite('String calculator should', function () {
  test('return 0 when empty string', function () {
    const calculator = new Calculator();
    
    const sum = calculator.add('');
    
    assert.equal(sum, 0);
  });
  
  test('return 1 when value is 1', function () {
    const calculator = new Calculator();
    
    const sum = calculator.add('1');
    
    assert.equal(sum, 1);
  });
});