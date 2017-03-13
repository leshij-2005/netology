class Site {
	constructor() {
		this._orders = {};
	}

	makeOrder(customer, order) {
		customer.buy(order);

		this._orders = {
			id: new Date().getTime(),
			customer,
			order
		}
	}

	clear() {
		this._orders = {};
	}
}
module.exports = Site;

