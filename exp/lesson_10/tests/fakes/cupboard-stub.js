class Cupboard {
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