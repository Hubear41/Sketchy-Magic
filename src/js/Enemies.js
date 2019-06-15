import * as VectorUTIL from './vector_util';

class Enemy {
    constructor(x, y, chest, canvas, speed, player) {
        this.canvas = canvas;
        this.chest = chest;
        this.player = player;
        this.position = {x, y};
        this.originalPosition = {x,y};
        this.carriedOffset = { x: -3, y: -3};
        this.dy;
        this.dx;
        this.target = chest;
        this.length = 20;
        this.moveSpeed = speed; // smaller is faster;
        this.role = 'STEAL';
        this.carrying = false;
        this.grabbing = false;
        this.escaping = false;
        this.life = 10;

        this.closestChestSpot = this.closestChestSpot.bind(this);

        this.findInitialMovement();
    }

    isNextToChest() {
        const { x, y } = this.position;
        const chestX = this.chest.position.x;
        const chestY = this.chest.position.y;
        const { chestHeight, chestWidth } = this.chest;
        
        if ( !this.chest.beingTaken && !this.chest.beingLifted && !this.chest.waitingToEscape ) {
            if ( x + this.length >= chestX && 
                    x <= chestX + chestWidth && 
                    y + this.length >= chestY && 
                    y <= chestY + chestHeight ) {
                        
                this.dx = 0;
                this.dy = 0;
    
                this.grabChest();
            } 
            
        } else if (this.chest.waitingToEscape && this.chest.currEnemy === this ) {
            this.escapeWithChest();
        } 

        return false;
    }

    draw() {
        const ctx = this.canvas.getContext('2d');

        ctx.beginPath();
        ctx.fillStyle = 'brown';
        ctx.fillRect(this.position.x, this.position.y, this.length, this.length);
        // ctx.fill();
        ctx.closePath();

        this.isNextToChest()

        if (this.role === 'STEAL' && this.chest.beingTaken && this.chest.currEnemy !== this ) {
            this.newObjective();
        } 
        else if ( this.role === 'HANGOUT') {
            this.updateHangout();
        }

        this.position.x += this.dx;
        this.position.y += this.dy;
    }

    grabChest() {
        if ( !this.chest.beingLifted && !this.chest.beingTaken) {
            this.grabbing = true;
            this.chest.pickUpChest(this.position, this.carriedOffset, this);
        }
    }

    escapeWithChest() {
        if ( !this.escaping ) {
            this.carrying = true;
            this.grabbing = false;

            const escapeVector = VectorUTIL.createVector(this.position, this.originalPosition);

            this.dx = escapeVector.dx / this.moveSpeed;
            this.dy = escapeVector.dy / this.moveSpeed;

            this.chest.moveWithEnemy({
                dx: this.dx,
                dy: this.dy,
            });

            this.escaping = true;
        }
    }

    closestChestSpot() {
        const enemyToChest = VectorUTIL.createVector(this.position, this.chest.position);
        let pointsToCheck = [];
        
        switch(enemyToChest.direction) {
            case 'N':
                pointsToCheck = pointsToCheck.concat(this._bottomChestPoints());
                break;
            case 'NE':
                pointsToCheck = pointsToCheck.concat(this._bottomChestPoints()).concat(this._leftChestPoints());
                break;
            case 'E':
                pointsToCheck = pointsToCheck.concat(this._leftChestPoints());
                break;
            case 'SE':
                pointsToCheck = pointsToCheck.concat(this._leftChestPoints()).concat(this._topChestPoints());
                break;
            case 'S':
                pointsToCheck = pointsToCheck.concat(this._topChestPoints());
                break;
            case 'SW':
                pointsToCheck = pointsToCheck.concat(this._topChestPoints()).concat(this._rightChestPoints());
                break;
            case 'W':
                pointsToCheck = pointsToCheck.concat(this._rightChestPoints());
                break;
            case 'NW':
                pointsToCheck = pointsToCheck.concat(this._rightChestPoints()).concat(this._bottomChestPoints());
                break;
            default: 
                break;
        }

        return VectorUTIL.findSmallestVector(this.position, pointsToCheck);
    }

    findInitialMovement() {
        const smallestVector = this.closestChestSpot();

        this.dx = smallestVector.dx / this.moveSpeed;
        this.dy = smallestVector.dy / this.moveSpeed;
    }

    clear() {
        const { x, y } = this.position;
        const ctx = this.canvas.getContext('2d');

        ctx.clearRect(x, y, this.length, this.length);
    }

    newObjective() {
        let randomNum = Math.floor(Math.random() * 99) + 1;

        if ( randomNum >= 1 && randomNum <= 40 ) {
            this.role = 'FOLLOW';
            this.assignFollwer();
        } else {
            this.role = 'HANGOUT';
            this.updateHangout();
        }
    }

    assignFollwer() {
        const { dx, dy } = this.chest;
        let modifier = Math.random();
        let time = Math.floor(Math.random * 1000 + 1)

        setTimeout( () => {
            this.dx = dx + modifier;
            this.dy = dy + modifier;
        }, time)
    }

    updatePosition(newDelta) {
        const { dx, dy } = newDelta;

        this.dx = dx;
        this.dy = dy;
    }

    updateHangout() {
        let distanceModifierY = Math.floor(Math.random() * 80) + this.player.playerHeight;
        let distanceModifierX = Math.floor(Math.random() * 80) + this.player.playerWidth;

        const compositeLength = Math.sqrt(distanceModifierX**2 + distanceModifierY**2);

        const hangoutPosition = {
            x: this.player.position.x + distanceModifierX,
            y: this.player.position.y + distanceModifierY,
        };

        const toPlayerVector = VectorUTIL.createVector(this.position, hangoutPosition);

        if ( toPlayerVector.length <= compositeLength ) {
            this.dx = 0;
            this.dy = 0;
        } else {
            this.dx = toPlayerVector.dx / (this.moveSpeed / 2);
            this.dy = toPlayerVector.dy / (this.moveSpeed / 2);
        }
    }

    _leftChestPoints() {
        const points = [];
        points.push(this.chest.position);
        const combinedRange = this.chest.position.y + this.chest.chestHeight;

        for (let y = this.chest.position.y + 1; y < combinedRange; y++) {
            const newPoint = { 
                X: this.chest.position.x,
                y,
            }

            points.push(newPoint);
        }

        return points;
    }

    _rightChestPoints() {
        const points = [];
        const firstPoint = {
            x: this.chest.position.x + this.chest.chestWidth,
            y: this.chest.position.y,
        }
        const combinedRange = this.chest.chestHeight + firstPoint.y;

        points.push(firstPoint);

        for (let y = firstPoint.y + 1; y < combinedRange; y++) {
            const newPoint = {
                x: firstPoint.x,
                y,
            }

            points.push(newPoint);
        }

        return points;
    }

    _topChestPoints() {
        const points = [];
        const firstPoint = this.chest.position;
        const combinedRange = firstPoint.x + this.chest.chestWidth;
        points.push(firstPoint);

        for (let x = firstPoint.x + 1; x < combinedRange; x++) {
            const newPoint = {
                x,
                y: firstPoint.y,
            };

            points.push(newPoint);
        }

        return points;
    }

    _bottomChestPoints() {
        const points = [];
        const firstPoint = {
            x: this.chest.position.x,
            y: this.chest.position.y + this.chest.chestHeight,
        };
        const combinedRange = firstPoint.x + this.chest.chestHeight;
        points.push(firstPoint);

        for (let x = this.chest.position.x + 1; x < combinedRange; x++) {
            const newPoint = {
                x,
                y: firstPoint.y,
            }
            points.push(newPoint);
        }

        return points;
    }
}

export default Enemy;