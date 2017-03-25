"use strict";

let assert = require('chai').assert;
let Barmen = require('../src/barmen');
let Visitor = require('../src/visitor');
let Cupboard = require('../src/cupboard');

suite('When barmen pours drinks', function () {
    let visitor = {};
    let barmen = {};
    let calendar = {};

    setup(function () {
        calendar = new CalendarStub();
        visitor = new Visitor();
        visitor.sober();
    });

    suite('cupboard is full', function () {
        test('barmen pours x3 volume on a birthday', function () {
            barmen = new Barmen(new CupboardStub());
            visitor.bithdate = '01.01.2017';
            calendar.today = '01.01.2017';

            const volumeInGlass = barmen.pour('beer', 100, visitor, calendar);

            assert(300, volumeInGlass);
        });
    });
});

class CupboardStub {
	isOpen() {
		return true;
	}

	hasDrink(drinkName, volume) {
		return true;
	}

	getDrink(drinkName, volume) {
		return volume;
	}
}

class CalendarStub {
	constructor() {
		this._today = "";
	}

	get today() {
		return this._today;
	}

	set today(value) {
		this._today = value;
	}
}

