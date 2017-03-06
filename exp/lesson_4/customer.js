"use strict";

class Customer {
  constructor(data) {
    this._data = data;
  }
  
  get name() {
    return this._data.name;
  }
  
  get rentals() {
    return this._data.rentals.map(rental => new Rental(rental));
  }
}

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

module.exports = Customer;