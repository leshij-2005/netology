var assert = require('assert');
var expect = require('chai').expect;
var Barmen = require('../src/barmen');
var Visitor = require('../src/visitor');
var ImageDownloader = require('../src/image-downloader');
var fs = require('fs');
var username = require('username');

suite('when barmen pours whisky', function () {
	let barmen = new Barmen();
	let me = new Visitor();
	let imageDownloader = new ImageDownloader();

	setup(function (done) {
		this.timeout(20000);
		me.sober();

		imageDownloader.download('http://www.rosa-obs.com/images/ccd/M31_karel_full.jpg',
			'mycar.jpg', function () {
				var car = me.getMyCar("mycar.jpg");
				me.goToBar(car);
				barmen.free();

				done();
			});
	});

	suite('i ask 50 grams', function () {
		test('I get and drink whisky', function (done) {
			fs.readFile('whisky.jpg', function (err, whisky) {
				if (err) {
					done(err);
				}

				var iAskVolume = 50;

				var volumeInGlass = barmen.pour(whisky, iAskVolume);
				me.drink(volumeInGlass);

				assert.equal(iAskVolume, volumeInGlass);
				assert.equal(false, me.isDrunk());
				assert.equal(50, me.getTotallyDrunk());

				done();
			});
		});
	});

	suite('i ask -10 grams', function () {
		test('I get an error', function (done) {
			fs.readFile('whisky.jpg', function (err, whisky) {
				if (err) {
					done(err);
				}

				var iAskVolume = -10;

				expect(() => barmen.pour(whisky, iAskVolume)).to.throw(/Invalid volume of whisky/);
				done();
			});
		});
	});

	suite('i ask 500 grams', function () {
		test('Barmen said there is no such glass', function (done) {

			username().then(un => {
				console.log(un);

				if (un === "dpavlov") {
					var iAskVolume = 500;
					var whisky = 1;

					expect(() => barmen.pour(whisky, iAskVolume)).to.throw(/There is no such glass/);
					done();

					return;
				}

				done();
			});
		})
	});

	teardown(function () {

	})
});