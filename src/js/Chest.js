class Chest {
    constructor(canvas) {
        this.canvas = canvas;
        this.dx = null;
        this.dy = null;
        this.taken = false;
        this.chestHeight = 40;
        this.chestWidth = 60;
        this.position = { 
            x: (canvas.width / 2) - (this.chestWidth / 2), 
            y: (canvas.height / 2) - (this.chestHeight / 2),
        };
    }
    clear() {
        const ctx = this.canvas.getContext('2d');

        ctx.clear
    }

    draw() {
        const ctx = this.canvas.getContext('2d');

        ctx.fillStyle = 'goldenrod';
        ctx.strokeStyle = 'orange';
        ctx.lineWidth = 5;
        ctx.fillRect(this.position.x, this.position.y, this.chestWidth, this.chestHeight);
        ctx.strokeRect(this.position.x, this.position.y, this.chestWidth, this.chestHeight);
    }

    pickedUpChest(characterPosition) {
        this.position.x = characterPosition.x - 10;
        this.position.y = characterPosition.y - 10;
        this.carrying = true;
    }

    droppedChest(currPosition) {
        const dx = currPosition.x - this.position.x;
        const dy = currPosition.y - this.position.y;

        this.carrying = false;
        this.position = currPosition;
        this.dx = null;
        this.dy = null;

        return { dx, dy } 
    }
}

export default Chest;