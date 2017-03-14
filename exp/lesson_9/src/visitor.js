class Visitor {
    constructor() {
        this.totallyDrunk = 0;
    }

    drink(volume) {
        this.totallyDrunk += volume;
        return volume;
    }

    sober() {
        this.totallyDrunk = 0;
    }

    isDrunk() {
        return this.totallyDrunk > 150;
    }

    getTotallyDrunk() {
        return this.totallyDrunk;
    }

    getMyCar() {

    }

    goToBar(car) {

    }
}

module.exports = Visitor;