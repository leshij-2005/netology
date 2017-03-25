'use strict';

class Barmen {
	constructor(cupboard) {
		this._cupboard = cupboard;
	}

	pour(drinkName, volume, visitor, calendar) {
		if (!this._cupboard.hasDrink(drinkName, volume)) {
			throw new Error('Sorry. Not enough ' + drinkName);
		}

		const drinkInGlass = this._cupboard.getDrink(drinkName, volume);

		if (calendar && calendar.today === visitor.birthdate) {
			return 3 * drinkInGlass;
		}

		return drinkInGlass;
	}
}

module.exports = Barmen;