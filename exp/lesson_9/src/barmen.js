class Barmen {
    constructor() {
        this.totalRequests = 0;
        this.age = 27;
    }

    pour(drink, volume) {
        if (volume < 0) {
            throw new Error('Invalid volume of whisky');
        }
        if (volume > 200) {
            throw new Error('There is no such glass');
        }

        this.totalRequests++;

        if (this.totalRequests % 2 == 0) {
            return volume + 50;
        }

        return volume;
    }

    free() {
        this.totalRequests = 0;
    }
}

module.exports = Barmen;