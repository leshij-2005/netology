class CashRegister {
	constructor() {
		this._lastCheck = '';
	}

	get lastCheck() {
		return this._lastCheck;
	}

	print(drink, volume) {
		this._lastCheck = `Buy ${drink} (${volume})`;
	}
}

module.exports = CashRegister;