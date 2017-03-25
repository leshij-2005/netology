class Visitor {
	constructor() {
		this._totalDrinkVolume = 0;
		this._birthdate = null;
	}

	get birthdate() {
		return this._birthdate;
	}

	set birthdate(value) {
		this._birthdate = value;
	}

	drink(volume) {
		this._totalDrinkVolume += volume;
		return volume;
	}

	sober() {
		this._totalDrinkVolume = 0;
	}

	isTotallyDrunk() {
		return this._totalDrinkVolume > 150;
	}

	getTotallyDrunk() {
		return this._totalDrinkVolume;
	}
}
module.exports = Visitor;