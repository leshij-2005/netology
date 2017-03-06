"use strict";

const Rental = require('./rental');

class Customer {
  constructor(data, movies) {
    this._data = data;
    this._movies = movies;
  }
  
  get name() {
    return this._data.name;
  }
  
  get rentals() {
    return this._data.rentals.map(rental => new Rental(rental, this._movies));
  }
  
  get totalFrequentRentalPoints() {
    return this.rentals
      .reduce((total, rental) => total + rental.frequentRentalPoints, 0);
  
  }
  
  get totalAmount() {
    return this.rentals
      .reduce((total, rental) => total + rental.amount, 0);
  }
}

module.exports = Customer;