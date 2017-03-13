class Customer {
	constructor(name) {
		this._movies = [];

		this._name = name;
	}

	get movies() {
		return this._movies;
	}

	get lastMovie() {
		return this._movies[this._movies.length - 1];
	}

	get discount() {
		return this._movies.length <= 3 ? this._movies.length * 5 : 15;
	}

	get name() {
		return this._name;
	}

	take(movies) {
		this._movies.push(...movies);
	}
}

module.exports = Customer;