"use strict";

const Customer = require('./customer.js');

function getAmount(rental) {
  let movie = rental.movie;
  let amount = 0;
  // determine amount for each movie
  switch (movie.code) {
    case "regular":
      amount = 2;
      if (rental.days > 2) {
        amount += (rental.days - 2) * 1.5;
      }
      break;
    case "new":
      amount = rental.days * 3;
      break;
    case "childrens":
      amount = 1.5;
      if (rental.days > 3) {
        amount += (rental.days - 3) * 1.5;
      }
      break;
  }
  
  return amount;
}

function getTotalFrequentRenterPoints(customer) {
  let totalFrequentRenterPoints = 0;
  for (let rental of customer.rentals) {
    totalFrequentRenterPoints += rental.frequentRentalPoints;
  }
  
  return totalFrequentRenterPoints;
}

function getTotalAmount(customer) {
  let totalAmount = 0;
  for (let rental of customer.rentals) {
    totalAmount += getAmount(rental);
  }
  
  return totalAmount;
}

function txtStatement(customerArg, movies) {
  const customer = new Customer(customerArg, movies);
  
  function buildHeader() {
    return `Rental Record for ${customer.name}\n`;
  }
  
  function buildBody() {
    let statement = '';
    for (let rental of customer.rentals) {
      statement += `\t${rental.movie.title}\t${getAmount(rental)}\n`;
    }
    
    return statement;
  }
  
  function buildFooter() {
    let statement = '';
    statement += `Amount owed is ${getTotalAmount(customer)}\n`;
    statement += `You earned ${getTotalFrequentRenterPoints(customer)} frequent renter points\n`;
    return statement;
  }
  
  let statement = buildHeader();
  statement += buildBody();
  statement += buildFooter();
  return statement;
}

function htmlStatement(customerArg, movies) {
  const customer = new Customer(customerArg, movies);
  
  const amount = () => getTotalAmount(customer);
  const frequentRenterPoints = () => getTotalFrequentRenterPoints(customer);
  const movie = (aRental) => aRental.movie;
  const rentalAmount = (aRental) => getAmount(aRental);
  
  let result = `<h1>Rental Record for <em>${customer.name}</em></h1>\n`;
  result += "<table>\n";
  for (let rental of customer.rentals) {
    result += `  <tr><td>${movie(rental).title}</td><td>${rentalAmount(rental)}</td></tr>\n`;
  }
  result += "</table>\n";
  result += `<p>Amount owed is <em>${amount()}</em></p>\n`;
  result += `<p>You earned <em>${frequentRenterPoints()}</em> frequent renter points</p>\n`;
  return result;
}

let customer = {
  name: "martin",
  rentals: [{
    "movieID": "F001",
    "days": 3
  }, {
    "movieID": "F002",
    "days": 1
  },]
};

let movies = {
  "F001": {
    "title": "Ran",
    "code": "regular"
  },
  "F002": {
    "title": "Trois Couleurs: Bleu",
    "code": "regular"
  },
};

console.log(txtStatement(customer, movies));
console.log(htmlStatement(customer, movies));