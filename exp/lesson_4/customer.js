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
    let total = 0;
    for (let rental of this.rentals) {
      total += rental.frequentRentalPoints;
    }
  
    return total;
  }
  
  get totalAmount() {
    let total = 0;
    for (let rental of this.rentals) {
      total += rental.amount;
    }
  
    return total;
  }
}

module.exports = Customer;