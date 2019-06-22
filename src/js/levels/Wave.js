class Wave {
    constructor(amt, tutorial = false, standStill = false, defaultPositions = null) {
        this.enemyCount = amt;
        this.nextWave = null;
        this.id = '_' + Math.random().toString(36).substr(2, 9); // from gordonbrander's ID.js
        this.standingStill = standStill === true ? this.hoverNearPosition : null;
        this.defaultPositions = defaultPositions === null || defaultPositions.length === 0 ? null : defaultPositions;
        // this.loaded = false;
    }

    hoverNearPosition() {
        return { dx: 0, dy: 0 };
    }
}

export default Wave;