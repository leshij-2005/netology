'use strict';

class Barmen {
    constructor(cupboard) {
        this._cupboard = cupboard;
    }

    pour(drinkName, volume, visitor) {
        if (!this._cupboard.hasDrink(drinkName, volume)) {
            throw new Error('Sorry. Not enough ' + drinkName);
        }

        return this._cupboard.getDrink(drinkName, volume);
    }
}

module.exports = Barmen;