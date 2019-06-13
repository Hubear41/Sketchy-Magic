class Chest {
    constructor(canvas) {
        this.dx = null;
        this.dy = null;
        this.chestHeight = 40;
        this.chestWidth = 60;
        this.position = { 
            x: (canvas.width / 2) - (this.chestWidth / 2), 
            y: (canvas.height / 2) - (this.chestHeight / 2),
        };
    }

    pickupChest(movementDelta) {
        this.dx = movementDelta.dx;
        this.dy = movementDelta.dy;
    }

    dropChest(currPosition) {
        const dx = currPosition.x - this.position.x;
        const dy = currPosition.y - this.position.y;

        this.position = currPosition;

        return { dx, dy } 
    }
}

export default Chest;