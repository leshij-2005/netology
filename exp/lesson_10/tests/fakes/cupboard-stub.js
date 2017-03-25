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
		return true;
	}

	hasDrink(drinkName, volume) {
		return true;
	}

	getDrink(drinkName, volume) {
		return volume;
	}
}

module.exports = Cupboard;