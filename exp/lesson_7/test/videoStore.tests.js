const assert = require('assert');
const VideoStore = require('../src/videoStore');
const Customer = require('../src/customer');

describe('Video store tests', () => {
	describe('when customer takes movie', () => {
		it('customer can take single movie', () => {
			let videoStore = new VideoStore();
			let customer = new Customer();

			videoStore.rent(customer, ['Batman']);

			assert.equal('Batman', customer.lastMovie);
		});

		it (`customer can't take movie if not return movie`, () => {
			let videoStore = new VideoStore({
				Den: ['Spider Man']
			});
			let customer = new Customer('Den');

			videoStore.rent(customer, ['Batman']);

			assert.equal(0, customer.movies.length);
		});
	});

	describe('when customer take several movies', () => {
		it ('if take 2 movies customer have discount equal 10%', () => {
			let videoStore = new VideoStore();
			let customer = new Customer();

			videoStore.rent(customer, ['Batman', 'Spider Man']);

			assert.equal(10, customer.discount);
		});

		it ('if take 4 movies customer have discount equal 15%', () => {
			let videoStore = new VideoStore();
			let customer = new Customer();

			videoStore.rent(customer, ['Batman', 'Spider Man', 'X-man', 'Superman']);

			assert.equal(15, customer.discount);
		});

		it (`customer can't take more 6 movies`, () => {
			let videoStore = new VideoStore();
			let customer = new Customer();

			let movies = ['Batman', 'Spider Man', 'X-man', 'Superman', 'Deadpool', 'Iron Man'];

			try {
				videoStore.rent(customer, movies);
			} catch (error) {
				assert.equal('Rent does not issue more than 5 films!', error.message);
			}
		});
	})
});