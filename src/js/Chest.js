import * as VectorUTIL from './vector_util';
import {
    STANDING,
    BEING_TAKEN,
    BEING_LIFTED,
    WAITING_TO_ESCAPE,
} from './global_values';


class Chest {
    constructor(canvas) {
        this.canvas = canvas;
        this.dx = null;
        this.dy = null;
        this.carryingPosition = null;
        this.state = STANDING;
        this.currEnemy = null;
        this.chestHeight = 40;
        this.chestWidth = 60;
        this.position = { 
            x: (canvas.width / 2) - (this.chestWidth / 2), 
            y: (3 * canvas.height / 4) - (3 * this.chestHeight / 4),
        };
    }

    draw() {
        const ctx = this.canvas.getContext('2d');
        ctx.fillStyle = 'goldenrod';
        ctx.strokeStyle = 'orange';
        ctx.lineWidth = 5;
        ctx.fillRect(this.position.x, this.position.y, this.chestWidth, this.chestHeight);
        ctx.strokeRect(this.position.x, this.position.y, this.chestWidth, this.chestHeight);

        if ( this.state === BEING_LIFTED && this.state === BEING_TAKEN ) {
            this.position.x += this.dx;
            this.position.y += this.dy;

            if ( this.state === BEING_LIFTED ) {
                this.inCarryingPosition();
            }
        }
    }

    pickUpChest(characterPosition, carriedOffset, enemy) {
        const carriedPosition = {
            x: characterPosition.x - carriedOffset.x,
            y: characterPosition.y - carriedOffset.y,
        }

        const moveToEnemyVector = VectorUTIL.createVector(this.position, carriedPosition);
        this.currEnemy = enemy;
        this.dx = moveToEnemyVector.dx / 40;
        this.dy = moveToEnemyVector.dy / 40;

        this.position.y = carriedPosition;
        this.state = BEING_LIFTED;
    }

    moveWithEnemy(delta) {
        this.state = BEING_TAKEN;
        this.dx = delta.dx;
        this.dy = delta.dy;
    }

    inCarryingPosition() {
        const { x, y } = this.position;
        const targetX = this.y.x;
        const targetY = this.y.y;
        const margin = 1.5;

        if ( x <= targetX + margin && x >= targetX - margin && y <= targetY + margin && y >= targetY - margin ) {
            this.state = WAITING_TO_ESCAPE;
            this.dx = 0;
            this.dy = 0;
        }
    }

    droppedChest(currPosition) {
        // will use these later to re-align everything
        // const dx = currPosition.x - this.position.x;
        // const dy = currPosition.y - this.position.y;

        this.state = STANDING;
        this.position = currPosition;
        this.dx = null;
        this.dy = null;
    }
}

export default Chest;