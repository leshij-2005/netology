const expect = require('chai').expect;
const Site = require('../src/site');
const Customer = require('../src/customer');

let site = new Site();
let customer = new Customer();

beforeEach(function () {
	customer.clear();
	site.clear();
});

describe('Given: Customer want X pizzas', () => {
	var testCases = [
		{askedPizzas: 1, expectedPizzas: 1},
		{askedPizzas: 2, expectedPizzas: 2},
		{askedPizzas: 5, expectedPizzas: 5}
	];

	describe('When: Customer orders X pizzas', () => {
		testCases.forEach(function (testCase) {
			it('Then: Customer got a order with ' + testCase.askedPizzas + ' pizzas', function () {
				site.makeOrder(customer, { pizzas: testCase.askedPizzas });

				expect(customer.purchase.pizzas).is.equal(testCase.expectedPizzas);
			});
		});
	});
});