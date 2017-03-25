"use strict";

let assert = require('chai').assert;
let Barmen = require('../src/barmen');
let Visitor = require('../src/visitor');
let Cupboard = require('./fakes/cupboard-stub');
let Calendar = require('./fakes/calendar-stub');
let CashRegister = require('./fakes/cashRegister-mock');

suite('When barmen pours drinks', function () {
    let visitor = {};
    let barmen = {};
    let calendar = {};
    let cashRegister = {};

    setup(function () {
        calendar = new Calendar();
	      cashRegister = new CashRegister();
        visitor = new Visitor();
        visitor.sober();
    });

    suite('cupboard is full', function () {
        test('barmen pours x3 volume on a birthday', function () {
            barmen = new Barmen(new Cupboard());
            visitor.birthdate = '01.01.2017';
	          calendar.today = '01.01.2017';

            const volumeInGlass = barmen.pour('beer', 100, visitor, calendar);

            assert.equal(volumeInGlass, 300);
        });

	      test('barmen gave a check on pour drink', function () {
            barmen = new Barmen(new Cupboard(), cashRegister);

            barmen.pour('beer', 100, visitor);

            assert.equal(cashRegister.lastCheck, 'Buy beer (100)');
	      });
    });
});

