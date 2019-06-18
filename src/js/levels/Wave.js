class Wave {
    constructor(amt, tutorial = false, standStill = false) {
        this.enemyCount = amt;
        this.nextWave;
        this.id = '_' + Math.random().toString(36).substr(2, 9); // from gordonbrander's ID.js
        this.standingStill = standStill === true ? this.hoverNearPosition : null;
    }

    hoverNearPosition() {
        return { dx: 0, dy: 0 };
    }
}

export default Wave;