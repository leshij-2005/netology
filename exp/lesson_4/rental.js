class Rental {
  constructor(data, movies) {
    this._data = data;
    this._movies = movies;
  }
  
  get movieID() {
    return this._data.movieID;
  }
  
  get days() {
    return this._data.days;
  }
  
  get movie() {
    return this._movies[this.movieID];
  }
  
  get frequentRentalPoints() {
    return (this.movie.code === "new" && this.days > 2) ? 2 : 1;
  }
}

module.exports = Rental;