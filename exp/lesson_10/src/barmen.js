'use strict';

const Calendar = require('./calendar');

class Barmen {
	constructor(cupboard, cashRegister, smsService) {
		this._cupboard = cupboard;
		this._cashRegister = cashRegister;
		this._smsService = smsService;

		if (this._smsService && this._cupboard.isLocked) {
		  this._smsService.send('Cupboard is locked and key is lost');
    }
	}

	pour(drinkName, volume, visitor, calendar = new Calendar) {
		if (!this._cupboard.hasDrink(drinkName, volume)) {
			if (this._smsService) {
				this._smsService.send(`${drinkName} is over. Order another keg!`);
			}

			throw new Error('Sorry. Not enough ' + drinkName);
		}

		const drinkInGlass = this._cupboard.getDrink(drinkName, volume);

    if (this._cashRegister) {
	    this._cashRegister.print(drinkName, volume);
    }

		if (calendar.today === visitor.birthdate) {
			return 3 * drinkInGlass;
		}

		return drinkInGlass;
	}
}

module.exports = Barmen;