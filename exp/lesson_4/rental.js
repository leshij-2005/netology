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
  
  get amount() {
    let movie = this.movie;
    let amount = 0;
    // determine amount for each movie
    switch (movie.code) {
      case "regular":
        amount = 2;
        if (this.days > 2) {
          amount += (this.days - 2) * 1.5;
        }
        break;
      case "new":
        amount = this.days * 3;
        break;
      case "childrens":
        amount = 1.5;
        if (this.days > 3) {
          amount += (this.days - 3) * 1.5;
        }
        break;
    }
  
    return amount;
  }
}

module.exports = Rental;