class VideoStore {
	constructor(archive = {}) {
		this._archive = archive;
	}

	addToArchive(customer, movies) {
		if (!this._archive[customer])
			this._archive[customer] = [];

		this._archive[customer].push(movies);
	}

	give(customer, movies) {
		const archive = this.getFromArchive(customer.name);

		if (archive && archive.length) {
			return;
		}

		customer.take(movies);

		this.addToArchive(customer.name, movies);
	}

	getFromArchive(name) {
		return this._archive[name];
	}
}

module.exports = VideoStore;