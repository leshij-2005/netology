class Visitor {
	constructor() {
		this._totalDrinkVolume = 0;
		this._bithdate = null;
	}

	get bithdate() {
		return this._bithdate;
	}

	set bithdate(value) {
		this._bithdate = value;
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