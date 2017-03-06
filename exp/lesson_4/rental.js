class Rental {
  constructor(data) {
    this._data = data;
  }
  
  get movieID() {
    return this._data.movieID;
  }
  
  get days() {
    return this._data.days;
  }
}

module.exports = Rental;