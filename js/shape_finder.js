import { relative } from "path";
import { Point } from "paper";

class ShapeFinder {
    constructor(tool, canvas) {
        this.tool = tool;
        this.canvas = canvas;
        this.prevPoint = {};
        this.prevVector = null;
        this.numCorners = 0;
        this.numSides = 0;
        this.pointsArr = [];
        this.anglesArr = [];
        this.prevPoint = null;
        this.currPoint = null;
        this.path;
        this.position;
        this.simpleShape;
        this.determineShape = this.determineShape.bind(this);
        this.resetPath = this.resetPath.bind(this);

        tool.onMouseDown = toolEvent => {
            this.path = new Path();
            this.path.strokeColor = 'black';

            this.prevPoint = toolEvent.point;
            this.pointsArr.push(toolEvent.point);
            this.position = this.path.position;
        }

        tool.onMouseDrag = toolEvent => {
            this.path.add(toolEvent.point);
            this.currPoint = toolEvent.point;

            this.checkDeltaChange();
        }

        tool.onMouseUp = toolEvent => {
            this.determineShape();
            this.resetPath();
        }
    }

    determineShape() {
        this.path.closePath();
        debugger
        switch (this.numCorners) {
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

        // console.log(this.shape);
    }

    resetPath() {
        this.path.remove();
        this.numCorners = 0;
        this.anglesArr = [];
        this.pointsArr = [];
        this.prevPoint = {};
        this.prevVector = null;
    }

    checkDeltaChange() {
        const currVector = this.findVector(this.prevPoint, this.currPoint);

        if ( this.prevVector ) {
            const prevAngle = this.prevVector.angle;
            const currAngle = currVector.angle;
            // const sameAngle = this._inRangeOf(prevAngle, currAngle);
            const diffDirection = this._inDifferentDirection(this.prevVector, currVector);
            // debugger
            console.log(`angle: ${currAngle} | direction: ${currVector.direction}`);

            if ( diffDirection ) {
                console.log('Direction Change')
                const tooClose = this.pointsAreClose(this.currPoint);

                if ( !tooClose) {
                    this.pointsArr.push(this.currPoint);
                    this.anglesArr.push(currVector.angle);
                    this.numCorners++;
    
                    let myCircle = new Path.Circle({
                        center: this.currPoint,
                        radius: 10,
                    });
    
                    myCircle.strokeColor = 'black';
                    myCircle.fillColor = 'white';
                } 
            }
        } else {
            let myCircle = new Path.Circle({
                center: this.currPoint,
                radius: 10,
            });

            myCircle.strokeColor = 'black';
            myCircle.fillColor = 'white';
        }

        this.prevVector = currVector;
        this.prevPoint = this.currPoint;
    }

    findVector(point1, point2) {
        const dx = point2.x - point1.x;
        const dy = point2.y - point1.y;
        const radians = Math.atan2(dy, dx);
        const angle = radians * (180 / Math.PI);
        const length = Math.sqrt(Math.pow(dx,2) + Math.pow(dy,2));
        const direction = this.findDirection(angle);

        return { dx, dy, angle, direction, length };
        // return { dx, dy, angle };
    }

    _inRangeOf(refenceAngle, currAngle) {
        const errorMargin = 5;

        if ( currAngle >= refenceAngle - errorMargin && currAngle <= refenceAngle + errorMargin) {
            return true;
        }

        return false;
    }

    _inDifferentDirection(vectorA, vectorB ) {
        let different = false;
        const errorMargin = 10;

        if ( vectorA.direction !== vectorB.direction ) {
            const angleA = vectorA.angle;
            const angleB = vectorB.angle;

            // debugger
            if ( Math.abs(angleB - angleA) > errorMargin ) {
                // debugger
                different = true;
            }
        }

        return different;
    }

    pointsAreClose(pointA) {
        const distanceMargin = 40;
        let tooClose = false;

        this.pointsArr.forEach( pointB => {
            const differenceVector = this.findVector(pointB, pointA);

            if ( differenceVector.length <= distanceMargin ) {
                tooClose = true;
                console.log(`[${pointA.x},${pointA.y}] is too Close to [${pointB.x},${pointB.y}]`);
            }
        });

        return tooClose;
    }

    findDirection(angle) {
        let direction = '';
        const relativeAngle = angle >= 0 ? angle % 360 : angle + 360;

        if ( relativeAngle >= 337.5 || relativeAngle <= 22.5 ) {
            direction = 'N';
        } else if ( relativeAngle >= 22.5 && relativeAngle <= 67.5) {
            direction = 'NE';
        } else if ( relativeAngle >= 67.5 && relativeAngle <= 112.5) {
            direction = 'E';
        } else if ( relativeAngle >= 112.5 && relativeAngle <= 157.5) {
            direction = 'SE';
        } else if ( relativeAngle >= 157.5 && relativeAngle <= 202.5) {
            direction = 'S';
        } else if ( relativeAngle >= 202.5 && relativeAngle <= 247.5) {
            direction = 'SW';
        } else if ( relativeAngle >= 247.5 && relativeAngle <= 292.5) {
            direction = 'W';
        } else if ( relativeAngle >= 292.5 && relativeAngle <= 337.5) {
            direction = 'NW';
        }
        
        return direction
    }
}

export default ShapeFinder;