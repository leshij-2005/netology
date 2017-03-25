class Calendar {
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

module.exports = Calendar;