const expect = require('chai').expect;
const Site = require('../src/site');
const Customer = require('../src/customer');

class TestCustomer {
	getCustomer() {
		return new Customer();
	}

	getCustomerWithBirthday() {
		return new Customer({ birthday: true });
	}

	getCustomerWithBonus() {
		return new Customer({ bonus: 100 });
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

	describe('When: Customer buy X pizzas', () => {
		testCases.forEach(function (testCase) {
			it('Then: Customer got a order with ' + testCase.askedPizzas + ' pizzas', function () {
				let customer = testCustomer.getCustomer();

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

	describe('When: Customer buy X pizzas', () => {
		testCases.forEach(function (testCase) {
			it('Then: Customer got a order with ' + testCase.askedPizzas + '+1 pizzas', function () {
				let customer = testCustomer.getCustomerWithBirthday();

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

	describe('When: Customer buy X pizzas and enter promo code ABCD', () => {
		testCases.forEach(function (testCase) {
			it('Then: Customer got a order for an amount ' + testCase.askedPizzas * site.price + '-100', function () {
				let customer = testCustomer.getCustomer();

				site.makeOrder(customer, { pizzas: testCase.askedPizzas }, 'ABCD');

				expect(customer.purchase.amount).is.equal(testCase.expectedAmount);
			});
		});
	});
});

describe('Given: Customer want 5 pizzas', () => {
	describe('When: Customer buy 5 pizzas', () => {
		it('Then: Customer got 5% of order amount to bonus', function () {
			let askedPizzas = 5;
			let expectedBonus = 5 * 100 * 0.05;
			let customer = testCustomer.getCustomer();

			site.makeOrder(customer, { pizzas: askedPizzas });

			expect(customer.bonus).is.equal(expectedBonus);
		});
	});
});

describe('Given: Customer want 2 pizzas', () => {
	describe('When: Customer buy 2 pizzas and pays bonuses 100', () => {
		it('Then: Customer got order an amount 100', function () {
			let askedPizzas = 2;
			let expectedAmount = 2 * 100 - 100;
			let customer = testCustomer.getCustomerWithBonus();

			site.makeOrder(customer, { pizzas: askedPizzas });

			expect(customer.purchase.amount).is.equal(expectedAmount);
		});
	});
});