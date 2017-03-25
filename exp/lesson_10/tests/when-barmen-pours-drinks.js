"use strict";

let assert = require('chai').assert;
let Barmen = require('../src/barmen');
let Visitor = require('../src/visitor');
let Cupboard = require('../src/cupboard');

suite('When barmen pours drinks', function () {
    let visitor = {};
    let barmen = {};

    setup(function () {
        visitor = new Visitor();
        visitor.sober();
    });

    suite('cupboard is full', function () {
        test('barmen pours x3 volume on a birthday', function () {

        });
    });
});

class CupboardStub {
	isOpen() {
		return true;
	};

	hasDrink(drinkName, volume) {
		return true;
	};

	getDrink(drinkName, volume) {
		return volume;
	}
}
