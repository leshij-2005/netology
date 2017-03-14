const expect = require('chai').expect;
const Site = require('../src/site');
const Customer = require('../src/customer');

class TestCustomer {
	getCustomer() {
		return new Customer();
	}

	getCustomerWithBrtrhday() {
		return new Customer(true);
	}
}

let site = new Site();
let testCustomer = new TestCustomer();

beforeEach(function () {
	site.clear();
});

describe('Given: Customer want X pizzas', () => {
	let testCases = [
		{askedPizzas: 1, expectedPizzas: 1},
		{askedPizzas: 2, expectedPizzas: 2},
		{askedPizzas: 5, expectedPizzas: 5}
	];

	let customer = testCustomer.getCustomer();

	describe('When: Customer buy X pizzas', () => {
		testCases.forEach(function (testCase) {
			it('Then: Customer got a order with ' + testCase.askedPizzas + ' pizzas', function () {
				site.makeOrder(customer, { pizzas: testCase.askedPizzas });

				expect(customer.purchase.pizzas).is.equal(testCase.expectedPizzas);
			});
		});
	});
});

describe('Given: Customer birthday', () => {
	let testCases = [
		{askedPizzas: 1, expectedPizzas: 2},
		{askedPizzas: 2, expectedPizzas: 3},
		{askedPizzas: 5, expectedPizzas: 6}
	];

	let customer = testCustomer.getCustomerWithBrtrhday();

	describe('When: Customer buy X pizzas', () => {
		testCases.forEach(function (testCase) {
			it('Then: Customer got a order with ' + testCase.askedPizzas + '+1 pizzas', function () {
				site.makeOrder(customer, { pizzas: testCase.askedPizzas });

				expect(customer.purchase.pizzas).is.equal(testCase.expectedPizzas);
			});
		});
	});
});

describe('Given: Customer want X pizzas', () => {
	let testCases = [
		{askedPizzas: 1, expectedAmount: 0},
		{askedPizzas: 2, expectedAmount: 100},
		{askedPizzas: 5, expectedAmount: 400}
	];

	let customer = testCustomer.getCustomer();

	describe('When: Customer buy X pizzas and enter promocode ABCD', () => {
		testCases.forEach(function (testCase) {
			it('Then: Customer got a order for an amount ' + testCase.askedPizzas * site.price + '-100', function () {
				site.makeOrder(customer, { pizzas: testCase.askedPizzas }, 'ABCD');

				expect(customer.purchase.amount).is.equal(testCase.expectedAmount);
			});
		});
	});
});