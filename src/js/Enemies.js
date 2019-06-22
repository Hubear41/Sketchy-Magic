import * as VectorUTIL from './vector_util';
import EnemyParticle from './particles/enemy_particles';

class Enemy {
    constructor(x, y, chest, canvas, speed, player) {
        this.canvas = canvas;
        this.chest = chest;
        this.player = player;
        this.position = { x, y };
        this.originalPosition = { x, y };
        this.carriedOffset = { x: -3, y: -3 };
        // this.movementFunction = defaultBehavior;
        this.dy;
        this.dx;
        this.length = 30;
        this.moveSpeed = speed; // smaller is faster;
        this.state = 'STEAL';
        this.carrying = false;
        this.grabbing = false;
        this.escaping = false;
        this.freezeNum = 0;
        this.freezeTimer = 5000;
        this.explosion = [];
        this.walkIdx = Math.floor(Math.random() * 8);

        this.closestChestSpot = this.closestChestSpot.bind(this);

        this.chooseSprite();
        this.locateChest();
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

        if ( this.state !== 'DEAD' && this.state !== 'DYING' ) {
            
            if ( this.state === 'FROZEN') {
                ctx.fillStyle = 'lightblue';
            } else {
                ctx.fillStyle = 'brown';
            }

            this.drawWalk(ctx);

            if ( this.state === 'STEAL' && this.chest.beingTaken && this.chest.currEnemy !== this ) {
                this.newObjective();
            } else if ( this.state === 'STEAL') {
                this.isNextToChest();
            } else if ( !this.chest.beingTaken && this.state !== 'FROZEN' ) {
                this.updateSpeed();
                this.locateChest();
            } else if (this.state === 'FROZEN') {
                this.animateShiver();
            } else if ( this.state === 'HANGOUT') {
                this.updateHangout();
            }
            
            this.position.x += this.dx;
            this.position.y += this.dy;
        } else {    
            // debugger
            this.drawDeath();
        }
    }

    drawDeath() {
        const ctx = this.canvas.getContext('2d');
        let remainingParticles = [];
        
        if ( this.state !== 'DYING' ) {
            this.state = 'DYING';
            this.dx = 0;
            this.dy = 0;
            this._prepDeathExplosion();
            
            this.dropChest();
        }

        this.explosion.forEach( particle => {
            particle.draw(ctx);

            if (particle.state !== 'DONE' ) {
                remainingParticles.push(particle);
            }
        });

        // debugger
        if ( remainingParticles.length === 0 ) {
            this.state = 'DEAD';
        } else {
            this.explosion = remainingParticles;
        }
    }

    drawWalk(ctx) {
        let currDirection;
        let primaryDirection = this.dx > this.dy ? this.dx : this.dy;
        if ( this.dx === primaryDirection ) {
            if ( this.dx > 0 ) {
                currDirection = 'RIGHT';
            } else {
                currDirection = 'LEFT';
            }
        } else {
            if ( this.dy > 0 ) {
                currDirection = 'UP';
            } else {
                currDirection = 'DOWN';
            }
        }

        const walkPositions = [60, 60, 60, 100, 100, 100, 100, 100, 100, 100, 120, 120, 120, 100, 100, 100, 100, 100, 100, 100];
        const currPos = walkPositions[this.walkIdx];
        this.walkIdx = (this.walkIdx + 1) % walkPositions.length;

        ctx.drawImage(this.spriteSheet, currPos, 20, 20, 20, this.position.x - this.length / 2, this.position.y - this.length / 2, this.length, this.length);
    }

    animateShiver() {
        if ( this.state !== 'DEAD' && this.state !== 'DYING') {
            if ( this.state !== 'FROZEN' ) {
                // for future use when enemies don't die in one hit
                // this.previousState = this.state;
                // this.previousDelta = {
                    //     dx: this.dx,
                    //     dy: this.dy,
                    // };
    
                this.state = 'FROZEN';
                this.freezeTimer = 4000;
            }
            
            if ( this.freezeNum === 1 || this.freezeNum === 5 ) {
                this.dx = 2;
                this.dy = 2;
            } else if (this.freezeNum === 2 || this.freezeNum === 6 ) {
                this.dx = -2;
                this.dy = -2;
            } else if (this.freezeNum === 3 || this.freezeNum === 7) {
                this.dx = -2;
                this.dy = -2;
            } else if (this.freezeNum === 4 || this.freezeNum === 8) {
                this.dx = 2;
                this.dy = 2;
            } else {
                this.dx = 0;
                this.dy = 0;
            }
            
            this.freezeNum = (this.freezeNum + 1) % 45;
            this.dropChest();
        }
    }

    dropChest() {
        if ( this.carrying || this.escaping || this.grabbing ) {
            this.carrying = false;
            this.escaping = false;
            
            this.chest.droppedChest(this.position);
        }
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

    locateChest() {
        this.state = 'STEAL';
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
        // let randomNum = Math.floor(Math.random() * 99) + 1;

        // if ( randomNum >= 1 && randomNum <= 40 ) {
            this.state = 'FOLLOW';
            this.assignFollower();
        // } else {
        //     this.state = 'HANGOUT';
        //     this.updateHangout();
        // }
    }

    assignFollower() {
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

    updateSpeed() {
        this.moveSpeed = Math.floor(Math.random() * 300) + 100;
    }

    chooseSprite() {
        this.spriteSheet = new Image();
        this.spriteNum = Math.floor(Math.random() * 2) + 2;
        this.spriteSheet.src = `assets/Enemies/Orc/orc${this.spriteNum}.png`;
    }

    _prepDeathExplosion() {
        const { x, y } = this.position; 
        const centerX = x + this.length / 2;
        const centerY = y + this.length / 2;

        for (let i = 0; i < 20; i++) {
            const xOffset = Math.random() * 10 - 5;
            const yOffset = Math.random() * 10 - 5;
            const particle = new EnemyParticle(centerX + xOffset, centerY + yOffset);
            
            this.explosion.push(particle);
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