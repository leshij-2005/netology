class Customer {
	constructor(props = {}) {
		this._purchase = {};
		this._birthday = props.birthday || false;
		this._bonus = props.bonus || 0;
	}

	buy(order) {
		this._purchase = order;

		this._bonus = order.amount * 0.05;
	}

	get bonus() {
		return this._bonus;
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
