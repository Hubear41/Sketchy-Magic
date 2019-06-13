import * as VectorUTIL from './vector_util';

class Enemy {
    constructor(x, y, chest, canvas) {
        this.canvas = canvas;
        this.position = {x, y};
        this.originalPosition = this.position;
        this.target = chest;
        this.radius = 10;
        this.moveRadius = 10;
        this.carrying = false;
        this.grabbing = false;
        this.life = 10;
    }

    moveTowardChest() {
        const { dx, dy } = this.closestChestSpot();
        
        const a = Math.sqrt( this.moveRadius / ( 1 + ( Math.pow(dx,2) / Math.pow(dy,2))) );
        const b = (dx / dy) * a;

        this.position = { x: a, y: b };
    }

    pickup() {
        
    }

    runaway() {
        const runawayVector = this.createVector(this.position, this.originalPosition);
        const { dx, dy } = runawayVector;

        const a = Math.sqrt(this.moveRadius / (1 + (Math.pow(dx, 2) / Math.pow(dy, 2))) );
        const b = (dx / dy) * a;

        this.position = { x: a, y: b };
    }

    draw() {
        const ctx = this.canvas.getContext('2d');

        ctx.beginPath();
        ctx.fillStyle = 'orange';
        ctx.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI);
        ctx.fill();
        ctx.closePath();

        if ( !carrying ) {
            this.moveTowardChest();
        } else {
            this.runaway();
        }
    }

    closestChestSpot() {
        const enemyToChest = VectorUTIL.createVector(this.position, this.chest.position);
        const pointsToCheck = [];

        switch(enemyToChest.direction) {
            case 'N':
                pointsToCheck.concat(this._bottomChestPoints);
                break;
            case 'NE':
                pointsToCheck.concat(this._bottomChestPoints).concat(this._leftChestPoints);
                break;
            case 'E':
                pointsToCheck.concat(this._leftChestPoints);
                break;
            case 'SE':
                pointsToCheck.concat(this._leftChestPoints).concat(this._topChestPoints);
                break;
            case 'S':
                pointsToCheck.concat(this._topChestPoints);
                break;
            case 'SW':
                pointsToCheck.concat(this._topChestPoints).concat(this._rightChestPoints);
                break;
            case 'W':
                pointsToCheck.concat(this._rightChestPoints);
                break;
            case 'NW':
                pointsToCheck.concat(this._rightChestPoints).concat(this._bottomChestPoints);
                break;
            default: 
                break;
        }

        return VectorUTIL.findSmallestVector(pointsToCheck);
    }

    _leftChestPoints() {
        const points = [];
        points.push(this.chest.position);

        for (let y = this.chest.position.y + 1; y < this.chest.height; y++) {
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
        points.push(firstPoint);

        for (let y = firstPoint.y + 1; y < this.chest.chestHeight; y++) {
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
        points.push(firstPoint);

        for (let x = firstPoint.x + 1; x < this.chest.chestWidth; x++) {
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

        points.push(firstPoint);

        for (let x = 0; x < this.chest.chestWidth; x++) {
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