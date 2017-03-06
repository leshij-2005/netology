"use strict";

const Customer = require('./customer.js');

function txtStatement(customer) {
  function buildHeader() {
    return `Rental Record for ${customer.name}\n`;
  }
  
  function buildBody() {
    let statement = '';
    for (let rental of customer.rentals) {
      statement += `\t${rental.movie.title}\t${rental.amount}\n`;
    }
    
    return statement;
  }
  
  function buildFooter() {
    let statement = '';
    statement += `Amount owed is ${customer.totalAmount}\n`;
    statement += `You earned ${customer.totalFrequentRentalPoints} frequent renter points\n`;
    return statement;
  }
  
  let statement = buildHeader();
  statement += buildBody();
  statement += buildFooter();
  return statement;
}

function htmlStatement(customer) {
  let result = `<h1>Rental Record for <em>${customer.name}</em></h1>\n`;
  result += "<table>\n";
  for (let rental of customer.rentals) {
    result += `  <tr><td>${rental.movie.title}</td><td>${rental.amount}</td></tr>\n`;
  }
  
  result += "</table>\n";
  result += `<p>Amount owed is <em>${customer.totalAmount}</em></p>\n`;
  result += `<p>You earned <em>${customer.totalFrequentRentalPoints}</em> frequent renter points</p>\n`;
  
  return result;
}

let data = {
  name: "martin",
  rentals: [{
    "movieID": "F001",
    "days": 3
  }, {
    "movieID": "F002",
    "days": 1
  }]
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


const customer = new Customer(data, movies);

console.log(txtStatement(customer));
console.log(htmlStatement(customer));