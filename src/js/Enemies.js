import * as VectorUTIL from './vector_util';

class Enemy {
    constructor(x, y, chest, canvas) {
        this.canvas = canvas;
        this.chest = chest;
        this.position = {x, y};
        this.originalPosition = {x,y};
        this.carriedOffset = { x: -3, y: -3};
        this.dy;
        this.dx;
        this.target = chest;
        this.radius = 20;
        this.moveSpeed = 400; // smaller is faster;
        this.carrying = false;
        this.grabbing = false;
        this.escaping = false;
        this.life = 10;

        this.closestChestSpot = this.closestChestSpot.bind(this);

        this.findInitialMovement();
    }

    // moveTowardChest() {
    //     const { dx, dy, length } = this.closestChestSpot();
    //     let a, b

    //     if ( dx === 0) {
    //         a = 0;
    //         b = this.moveRadius;
    //     } else if ( dy === 0 ) {
    //         a = this.moveRadius;
    //         b = 0
    //     } else {
    //         a = Math.sqrt( Math.pow(this.moveRadius, 2) / ( 1 + ( Math.pow(dx,2) / Math.pow(dy,2))) );
    //         b = (dx / dy) * a;
    //         // debugger
    //     }

    //     this.position = { x: Math.ceil(a), y: Math.ceil(b) };
    // }

    pickup() {
        
    }

    isNextToChest() {
        const { x, y } = this.position;
        const chestX = this.chest.position.x;
        const chestY = this.chest.position.y;
        const { chestHeight, chestWidth } = this.chest;
        
        if ( !this.carrying || !this.chest.beingTaken ) {
            if ( (x + this.radius >= chestX && x - this.radius <= chestX + chestWidth) && 
                    (y + this.radius >= chestY && y - this.radius <= chestY + chestHeight) ) {

                this.dx = 0;
                this.dy = 0;
    
                this.grabChest();
            }
        }

        return false;
    }

    draw() {
        const ctx = this.canvas.getContext('2d');

        // this.clear();
        ctx.beginPath();
        ctx.fillStyle = 'brown';
        ctx.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI);
        ctx.fill();
        ctx.closePath();

        this.isNextToChest()
        this.position.x += this.dx;
        this.position.y += this.dy;

        // if ( !this.carrying ) {
        //     this.moveTowardChest();
        // } else {
        //     this.runaway();
        // }
    }

    grabChest() {
        if ( !this.chest.beingLifted && !this.chest.beingTaken ) {
            this.grabbing = true;
            this.chest.pickUpChest(this.position, this.carriedOffset);
        } else if ( this.chest.beingTaken && !this.escaping) {
            this.carrying = true;
            this.grabbing = false;

            const escapeVector = VectorUTIL.createVector(this.originalPosition, this.position);

            this.dx = escapeVector.dx / this.moveSpeed;
            this.dy = escapeVector.dy / this.moveSpeed;
            
            this.chest.moveWithEnemy({
                dx: this.dx,
                dy: this.dy,
            });

            this.escaping = true;
            // debugger
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
        // debugger
        this.dx = smallestVector.dx / this.moveSpeed;
        this.dy = smallestVector.dy / this.moveSpeed;

        // debugger
    }

    clear() {
        const { x, y } = this.position;
        const ctx = this.canvas.getContext('2d');
        const rectX = x - this.radius;
        const rectY = y - this.radius;

        ctx.clearRect(rectX, rectY, this.radius * 2, this.radius * 2);
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