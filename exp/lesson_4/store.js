"use strict";

const Customer = require('./customer.js');

function movieFor(rental) {
  return movies[rental.movieID];
}

function getAmount(rental) {
  let movie = movieFor(rental);
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

function getFrequentRenterPoints(rental) {
  return (movieFor(rental).code === "new" && rental.days > 2) ? 2 : 1;
}

function getTotalFrequentRenterPoints(customer) {
  let totalFrequentRenterPoints = 0;
  for (let rental of customer.rentals) {
    totalFrequentRenterPoints += getFrequentRenterPoints(rental);
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

function txtStatement(customerArg) {
  const customer = new Customer(customerArg);
  
  function buildHeader() {
    return `Rental Record for ${customer.name}\n`;
  }
  
  function buildBody() {
    let statement = '';
    for (let rental of customer.rentals) {
      statement += `\t${movieFor(rental).title}\t${getAmount(rental)}\n`;
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

function htmlStatement(customerArg) {
  const customer = new Customer(customerArg);
  
  const amount = () => getTotalAmount(customer);
  const frequentRenterPoints = () => getTotalFrequentRenterPoints(customer);
  const movie = (aRental) => movieFor(aRental);
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

console.log(txtStatement(customer));
console.log(htmlStatement(customer));