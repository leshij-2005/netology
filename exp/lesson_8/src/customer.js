class Customer {
	constructor(isBirthday = false) {
		this._purchase = {};
		this._birthday = isBirthday;
	}

	buy(order) {
		this._purchase = order;
	}

	get birthday() {
		return this._birthday;
	}

	get purchase() {
		return this._purchase;
	}

	clear() {
		this._purchase = {};
	}
}
module.exports = Customer;
