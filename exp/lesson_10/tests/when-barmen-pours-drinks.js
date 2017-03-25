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
    let smsService = {};
    let cupboard = {};

    setup(function () {
        calendar = new Calendar();
	      cashRegister = new CashRegister();
	      smsService = new SmsServiceMock();
	      cupboard = new Cupboard();
        visitor = new Visitor();
        visitor.sober();
    });

    suite('cupboard is full', function () {
        test('barmen pours x3 volume on a birthday', function () {
            barmen = new Barmen(cupboard);
            visitor.birthdate = '01.01.2017';
	          calendar.today = '01.01.2017';

            const volumeInGlass = barmen.pour('beer', 100, visitor, calendar);

            assert.equal(volumeInGlass, 300);
        });

	      test('barmen gave a check on pour drink', function () {
            barmen = new Barmen(cupboard, cashRegister);

            barmen.pour('beer', 100, visitor);

            assert.equal(cashRegister.lastCheck, 'Buy beer (100)');
	      });
    });

	suite('cupboard is locked', function () {
		test('smsService send message', function () {
			cupboard.isLocked = true;

			barmen = new Barmen(cupboard, cashRegister, smsService);

			assert.equal(smsService.lastSentSms, 'Cupboard is locked and key is lost');
		});
	});
});

class SmsServiceMock {
	constructor() {
		this._lastSentSms = '';
	}

	send(message) {
		this._lastSentSms = message;
	}

	get lastSentSms() {
		return this._lastSentSms;
	}
}

