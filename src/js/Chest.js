import * as VectorUTIL from './vector_util';

class Chest {
    constructor(canvas) {
        this.canvas = canvas;
        this.dx = null;
        this.dy = null;
        this.carringPosition = null;
        this.taken = false;
        this.beingLifted = false;
        this.currEnemy = null;
        this.chestHeight = 40;
        this.chestWidth = 60;
        this.position = { 
            x: (canvas.width / 2) - (this.chestWidth / 2), 
            y: (canvas.height / 2) - (this.chestHeight / 2),
        };
    }

    // clear() {
    //     const ctx = this.canvas.getContext('2d');

    //     ctx.clear
    // }

    draw() {
        const ctx = this.canvas.getContext('2d');

        ctx.fillStyle = 'goldenrod';
        ctx.strokeStyle = 'orange';
        ctx.lineWidth = 5;
        ctx.fillRect(this.position.x, this.position.y, this.chestWidth, this.chestHeight);
        ctx.strokeRect(this.position.x, this.position.y, this.chestWidth, this.chestHeight);

        if ( this.beingLifted || this.taken ) {
            this.position.x += this.dx;
            this.position.y += this.dy;

            if ( this.beingLifted ) {
                this.inCarryingPosition();
            }
        }
    }

    pickUpChest(characterPosition, carriedOffset) {
        const carriedPosition = {
            x: characterPosition.x - carriedOffset.x,
            y: characterPosition.y - carriedOffset.y,
        }
        const moveToEnemyVector = VectorUTIL.createVector(this.position, carriedPosition);
        
        this.dx = moveToEnemyVector.dx / 100;
        this.dy = moveToEnemyVector.dy / 100;

        this.carringPosition = carriedPosition;
        this.beingLifted = true;
    }

    moveWithEnemy(delta) {
        this.dx = delta.dx;
        this.dy = delta.dy;
    }

    inCarryingPosition() {
        const { x, y } = this.position;
        const targetX = this.carringPosition.x;
        const targetY = this.carringPosition.y;
        const margin = 1.5;

        if ( x <= targetX + margin && x >= targetX - margin && y <= targetY + margin && y >= targetY - margin ) {
            this.beingLifted = false;
            this.beingTaken = true;
            this.dx = 0;
            this.dy = 0;
        }
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