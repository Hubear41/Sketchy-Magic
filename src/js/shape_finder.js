import Spell from './spells/Spell';
import LineSpell from './spells/line-spell';
import { Point } from 'paper';
import * as VectorUTIL from './vector_util';

class ShapeFinder {
    constructor(tool, canvas) {
        this.tool = tool;
        this.canvas = canvas;
        this.prevPoint = {};
        this.prevVector = null;
        this.numCorners = 0;
        this.numPoints = 0;
        this.pointsArr = [];
        this.anglesArr = [];
        this.prevPoint = null;
        this.currPoint = null;
        this.shape = null;
        this.path;
        this.position;
        this.currentSpell;
        this.circleParams = { center: null, radius: 0 };
        this.determineShape = this.determineShape.bind(this);
        this.resetPath = this.resetPath.bind(this);
        this.drawSimplifiedShape = this.drawSimplifiedShape.bind(this);

        tool.onMouseDown = toolEvent => {
            this.path = new Path();
            this.path.opacity = 0.5;
            this.path.strokeColor = 'blue';
            this.path.strokeWidth = '5';

            this.prevPoint = toolEvent.point;
            this.pointsArr.push(toolEvent.point);
            this.position = this.path.position;
            this.numPoints++;
        }

        tool.onMouseDrag = toolEvent => {
            this.path.add(toolEvent.point);
            this.currPoint = toolEvent.point;
            this.numPoints++;
            this.checkDeltaChange();
        }

        tool.onMouseUp = toolEvent => {
            this.drawShape();
            this.resetPath();
        }
    }

    drawShape() {
        this.pointsArr = this.removeRedundantPoints();

        this.determineShape(this.pointsArr);

        if ( this.shape === 'Circle' ) {
            this.drawCircle(); 
        } else if ( this.shape ) {
            // this.drawSimplifiedShape(this.pointsArr);
            const spellAttr = {
                position: this.position,
                points: this.pointsArr,
                shape: this.shape,
            }

            if ( this.shape === 'LINE') {
                this.currentSpell = new LineSpell(spellAttr);
            } else {
                this.currentSpell = new Spell(spellAttr);
            }
        }
    }

    determineShape(allPoints) {
        switch (allPoints.length) {
            case 1: 
                this.shape = "LINE";
                break;
            case 2:
                this.shape = "LINE";
                break;
            case 3: 
                this.shape = "TRIANGLE";
                break;
            case 4:
                this.shape = 'SQUARE';
                break;
            case 5:
                this.shape = 'STAR/PENTAGON';
                break;
            default:
                this.shape = null
        }

        console.log(this.shape);
    }

    resetPath() {
        this.path.remove();
        this.numCorners = 0;
        this.anglesArr = [];
        this.pointsArr = [];
        this.prevPoint = {};
        this.prevVector = null;
        this.shape = null;
    }

    checkIfCircle() {
        if ( this.pointsArr.length < 3) { return; }

        const margin = 5;
        const radii = [];
        const xs = [];
        const ys = [];
        let longest = { length: 1000 }, shortest = { length: 0 };

        // collects all x values and y values
        this.pointsArr.forEach( point => {
            xs.push(point.x);
            ys.push(point.y);
        });

        const sumX = xs.reduce( (a, b) => a + b, 0); // sum of all x values
        const sumY = ys.reduce( (a, b) => a + b, 0); // sum of all y values
        const centerX = sumX / xs.length; // center x = average of all x values
        const centerY = sumY / ys.length; // center y = average of all y values

        const center = new Point(centerX, centerY);

        let sumAllRadii = 0;
        for (let idx = 0; idx < this.pointsArr.length; idx++) {
            const point = this.pointsArr[idx];
            const vector = VectorUTIL.createVector(center, point);
            radii.push(vector.length);
            sumAllRadii += vector.length;
        }

        const averageRadius = sumAllRadii / this.pointsArr.length;
        const anyOutliers = radii.some( radius => radius < averageRadius + margin || 
                                            radius > averageRadius - margin );
            
        if ( !anyOutliers ) {
            this.shape = 'Circle';
            this.circleParams = { center, radius: averageRadius };
        } else {
            this.shape = null;
        }
    }

    checkDeltaChange() {
        const currVector = VectorUTIL.createVector(this.prevPoint, this.currPoint);

        if ( this.prevVector ) {
            const directionChange = this._inDifferentDirection(this.prevVector, currVector);

            if ( directionChange ) {
                const tooClose = this._cornersAreClose(this.currPoint);

                if ( !tooClose ) {
                    this.pointsArr.push(this.currPoint);
                    this.anglesArr.push(currVector.angle);
                    this.numCorners++;
                    this.numPoints = 0;
                } 
            }
        }

        this.prevVector = currVector;
        this.prevPoint = this.currPoint;
    }


    removeRedundantPoints() {
        const startPoint = this.pointsArr[0];
        const finalPoints = [startPoint];

        for (let idx = 1; idx < this.pointsArr.length; idx++) {
            const currPoint = this.pointsArr[idx];
            const prevPoint = finalPoints[finalPoints.length - 1];
            let nextPoint;

            if ( idx === this.pointsArr.length - 1) {
                nextPoint = startPoint;
            } else {
                nextPoint = this.pointsArr[idx + 1];
            }

            const currVector = VectorUTIL.createVector(prevPoint, currPoint);
            const nextVector = VectorUTIL.createVector(prevPoint, nextPoint);

            if ( this.compareVectors(currVector, nextVector) ) {
                continue;
            } else {
                finalPoints.push(currPoint);
            }
        }

        return finalPoints;
    }

    drawSimplifiedShape(allPoints) {
        const ctx = this.canvas.getContext('2d');
        const start = allPoints.shift();

        ctx.beginPath();
        ctx.lineWidth = "5";
        ctx.strokeColor = 'green';
        ctx.moveTo(start.x, start.y);

        allPoints.forEach( (point, idx) => {
            const { x, y } = point;

            if ( idx !== allPoints.length - 1 ) {
                ctx.lineTo(x, y);
            } else {
                ctx.lineTo(x, y);
                ctx.lineTo(start.x, start.y);
            }
        });

        ctx.closePath()
        ctx.fillStyle = 'red';
        ctx.fill();
        ctx.stroke();
    }


    drawCircle() {
        const { center, radius } = this.circleParams;
        const ctx = this.canvas.getContext('2d');

        ctx.beginPath();
        ctx.lineWidth = "5";
        ctx.strokeColor = 'blue';
        ctx.arc(center.x, center.y, radius, 0, 2 * Math.PI, false);
        ctx.closePath();
        ctx.fillStyle = 'green';
        ctx.fill();
        ctx.stroke();
    }

    // _movingSlowly(vector) {
    //     const speedMargin = 0.4;
    //     const speed = vector.length / this.numPoints;
    //     // console.log(`Speed: ${speed} length/points`);
    //     this.speed = speed;
    //     if ( speed <= speedMargin ) {
    //         return true;
    //     } else {
    //         return false;
    //     }
    // }

    // _isLargeChange(oldVector, newVector) {
    //     const avgDy = (newVector.dy + oldVector.dy) / 2;
    //     const avgDx = (newVector.dx + oldVector.dx) / 2;
    //     const dyDiff = Math.abs(newVector.dy - avgDy);
    //     const dxDiff = Math.abs(newVector.dx - avgDx);
    //     const totalDiff = dxDiff + dyDiff;
    //     const changeMargin = dxDiff === 0 || dyDiff === 0 ? 1 : 1.5;


    //     console.log( totalDiff );
    //     if (totalDiff > changeMargin) {
    //         return true;
    //     } else {
    //         return false;
    //     }
    // }

    compareVectors(vectorA, vectorB) {
        const ratioA = vectorA.dx / vectorA.dy
        const ratioB = vectorB.dx / vectorB.dy
        
        if ( ratioA === ratioB ) {
            return true;
        } 
        
        const errorRatio = 0.2;
        const multipleA = Math.abs(vectorA.dx * Math.pow(ratioA, -1));
        const multipleB = Math.abs(vectorB.dx * Math.pow(ratioB, -1));
        const biggerMultiple = multipleA > multipleB ? multipleA : multipleB;
        const errorMargin = errorRatio * biggerMultiple;
        const bigVectorAx = ratioA * biggerMultiple;
        const bigVectorBx = ratioB * biggerMultiple;

        if (Math.abs(Math.abs(bigVectorBx) - Math.abs(bigVectorAx)) <= errorMargin ) {
            return true;
        } else {
            return false;
        }
    }

    // compareDirections(directionA, directionB) {
    //     const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];

    //     if ( directionA === directionB) {
    //         return true;
    //     }

    //     let prevDirection, nextDirection;
    //     const currIndex = directions.indexOf(directionA); 
    //     if ( currIndex === 0 ) {
    //         prevDirection = 'NW';
    //         nextDirection = 'NE';
    //     } else if ( currIndex === directions.length - 1) {
    //         prevDirection = 'W';
    //         nextDirection = 'N';
    //     } else {
    //         prevDirection = directions[currIndex - 1];
    //         nextDirection = directions[currIndex + 1];
    //     }

    //     if ( directionB === prevDirection || directionB === nextDirection ) {
    //         return true;
    //     } else {
    //         return false
    //     }
    // }

    _inDifferentDirection(vectorA, vectorB) {
        let different = false;
        const errorMargin = 5;

        if ( vectorA.direction !== vectorB.direction ) {
            const angleA = vectorA.angle;
            const angleB = vectorB.angle;

            if ( Math.abs(angleB - angleA) > errorMargin ) {
                different = true;
            }
        }

        return different;
    }

    _cornersAreClose(pointA) {
        let distanceMargin = 40;
        let tooClose = false;

        this.pointsArr.forEach( (pointB, idx) => {
            const differenceVector = VectorUTIL.createVector(pointB, pointA);
            if ( idx === 0 ) {
                distanceMargin *= 2;
            }
            if ( differenceVector.length <= distanceMargin ) {
                tooClose = true;
            }
        });

        return tooClose;
    }
}

export default ShapeFinder;