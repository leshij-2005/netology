'use strict';

class Cupboard {
    constructor() {
        this._isLocked = false;
    }

    get isLocked() {
        return this._isLocked;
    }

    set isLocked(value) {
        this._isLocked = value;
    }

    isOpen() {
        // Database request
        //
        // return repository.hasAnyDrink();
        // ...
        //

        return true;
    };

    hasDrink(drinkName, volume) {
        // Database request
        //
        // repository.hasDrink(drinkName);
        // ...
        //

        return true;
    };

    getDrink(drinkName, volume) {
        // Database request
        //
        // repository.getDrinkBy(drinkName, volume);
        // ...
        //

        return volume;
    }
}

module.exports = Cupboard;