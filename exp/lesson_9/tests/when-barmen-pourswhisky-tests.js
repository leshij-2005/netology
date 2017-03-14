var assert = require('assert');
var expect = require('chai').expect;
var Barmen = require('../src/barmen');
var Visitor = require('../src/visitor');

suite('when barmen pours whisky', function () {
  let barmen = new Barmen();
  let me = new Visitor();
  
  setup(function () {
    me.sober();
    barmen.free();
  });
  
  suite('i ask 50 grams', function () {
    test('I get 50 grams', function () {
      var iAskVolume = 50;
      var whisky = 1;
      
      var volumeInGlass = barmen.pour(whisky, iAskVolume);
      
      assert.equal(iAskVolume, volumeInGlass);
    });
  });
  
  suite('I get 50 grams whisky', function () {
    test('I drink whisky', function () {
      var volumeInGlass = 50;
      
      me.drink(volumeInGlass);
      
      assert.equal(50, me.getTotallyDrunk());
    });
  });
  
  suite('i drink 50 grams', function () {
    test('I not is drunk', function () {
      var volumeInGlass = 50;
      
      me.drink(volumeInGlass);
      
      assert.equal(false, me.isDrunk());
    });
  });
  
  suite('i ask -10 grams', function () {
    test('I get an error', function () {
      var iAskVolume = -10;
      var whisky = 1;
      
      expect(() => barmen.pour(whisky, iAskVolume)).to.throw(/Invalid volume of whisky/);
    });
  });
  
  suite('i ask 500 grams', function () {
    test('Barmen said there is no such glass', function () {
      var iAskVolume = 500;
      var whisky = 1;
      
      expect(() => barmen.pour(whisky, iAskVolume)).to.throw(/There is no such glass/);
    });
  });
  
  teardown(function () {
    
  })
});