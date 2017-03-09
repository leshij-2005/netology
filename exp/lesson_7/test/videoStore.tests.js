const assert = require('assert');
const VideoStore = require('../src/videoStore');
const Customer = require('../src/customer');

describe('Video store tests', () => {
	describe('when customer take movie', () => {
		it('if take movie Batman', () => {
			let videoStore = new VideoStore();
			let customer = new Customer();

			videoStore.give(customer, ['Batman']);

			assert.equal('Batman', customer.lastMovie);
		});

		it ('if customer not return movie', () => {
			let videoStore = new VideoStore({
				Den: ['Spider Man']
			});
			let customer = new Customer('Den');

			videoStore.give(customer, ['Batman']);

			assert.equal(0, customer.movies.length);
		});
	});

	describe('when customer take several movies', () => {
		it ('if take 2 movies customer have discount equal 10%', () => {
			let videoStore = new VideoStore();
			let customer = new Customer();

			videoStore.give(customer, ['Batman', 'Spider Man']);

			assert.equal(10, customer.discount);
		});

		it ('if take 4 movies customer have discount equal 15%', () => {
			let videoStore = new VideoStore();
			let customer = new Customer();

			videoStore.give(customer, ['Batman', 'Spider Man', 'X-man', 'Superman']);

			assert.equal(15, customer.discount);
		});

		it ('if take 6 movies customer have 5 movies', () => {
			let videoStore = new VideoStore();
			let customer = new Customer();

			videoStore.give(customer, ['Batman', 'Spider Man', 'X-man', 'Superman', 'Deadpool', 'Iron Man']);

			assert.equal(5, customer.movies.length);
		});
	})
});