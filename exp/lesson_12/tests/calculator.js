const assert = require('chai').assert;
const Calculator = require('../src/calculator');

suite('String calculator should', function () {
  test('return 0 when empty string', function () {
    const calculator = new Calculator();
    
    const sum = calculator.add('');
    
    assert.equal(sum, 0);
  });
});