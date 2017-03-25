"use strict";

let sinon = require('sinon');
let Barmen = require('../src/barmen');
let Visitor = require('../src/visitor');
let Cupboard = require('./fakes/cupboard-stub');
let SmsService = require('../src/smsService');
let CashRegister = require('./fakes/cashRegister-mock');

suite('When barmen pours drinks', function () {
    let visitor = {};
    let barmen = {};
    let cashRegister = {};
    let cupboard = {};

    setup(function () {
	      cashRegister = new CashRegister();
	      cupboard = new Cupboard();
        visitor = new Visitor();
        visitor.sober();
    });

    suite('cupboard is full', function () {
		    test('barmen gave a check on pour drink', function () {
			      const cashRegisterMock = sinon.mock(cashRegister);

			      barmen = new Barmen(cupboard, cashRegister);

			      cashRegisterMock.expects('print')
				        .once()
				        .withArgs('beer', 100);

			      barmen.pour('beer', 100, visitor);

			      cashRegisterMock.verify();
			      cashRegisterMock.restore();
		    });

		    test('drink is over and smsService send message', function () {
		    	  const smsService = new SmsService();
		    	  const smsServiceMock = sinon.mock(smsService);

			      smsServiceMock.expects('send')
						    .once()
						    .withArgs('Light beer is over. Order another keg!');

			      barmen = new Barmen(cupboard, cashRegister, smsService);

				    runWithTryCatch(() => {
					      barmen.pour('Light beer', 100, visitor);
				    });

			      smsServiceMock.verify();
			      smsServiceMock.restore();
		    });

		    const runWithTryCatch = (action) => {
				    try {
					      action();
				    } catch (exception) { }
		    }
    });
});

