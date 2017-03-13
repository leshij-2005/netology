class Customer {
	constructor() {
		this._purchase = {};
	}

	buy(order) {
		this._purchase = order;
	}

	get purchase() {
		return this._purchase;
	}

	clear() {
		this._purchase = {};
	}
}
module.exports = Customer;
