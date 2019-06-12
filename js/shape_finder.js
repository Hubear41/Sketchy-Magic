class ShapeFinder {
    constructor(tool, canvas) {
        this.tool = tool;
        this.canvas = canvas;
        this.previousPoint = { x: 0, y: 0 };
        this.previousVector = null;
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
        this.previousPoint = { x: 0, y: 0 };
        this.previousVector = null;
    }

    findDelta(point1, point2) {
        const dx = point2.x - point1.x;
        const dy = point2.y - point1.y;
        const radians = Math.atan2(dy, dx);
        const angle = radians * (180 / Math.PI);
        const directionGroups = this._findDirectionGroups(angle);
        // this.anglesArr.push(angle)

        return { dx, dy, angle, groups: directionGroups };
    }

    checkDeltaChange() {
        const newVector = this.findDelta(this.prevPoint, this.currPoint);

        if ( this.previousVector ) {
            const newAngle = Math.floor((this.previousVector.angle + newVector.angle) / 2);
            const newAngleGroups = this._findDirectionGroups(newAngle);
            let sameGroups = true;

            newAngleGroups.forEach( groupNum => {
                if (!this.previousVector.groups.includes(groupNum) || !newVector.groups.includes(groupNum)) {
                    sameGroups = false;
                }
            });

            if ( !sameGroups ) {
                this.pointsArr.push(this.currPoint);
                this.anglesArr.push(newVector.angle);
                this.numCorners++;

                let myCircle = new Path.Circle({
                    center: this.currPoint,
                    radius: 10,
                });

                myCircle.strokeColor = 'black';
                myCircle.fillColor = 'white';
            }
        }

        this.previousVector = newVector;
    }

    _findDirectionGroups(angle) {
        const groups = [];

        if ( angle > 355 || angle < 5 ) {
            groups.concat([1,8]);
        } else if ( angle >= 5 && angle <= 40 ) {
            groups.push(1);
        } else if ( angle > 40 && angle < 50 ) {
            groups.concat([1,2]);
        } else if ( angle >= 50 && angle <= 85 ) {
            groups.push(2);
        } else if ( angle > 85 && angle < 95 ) {
            groups.concat([2,3]);
        } else if ( angle >= 95 && angle <= 130) {
            groups.push(3);
        } else if ( angle > 130 && angle < 145 ) {
            groups.concat([3,4]);
        } else if ( angle >= 145 && angle <= 175) {
            groups.push(4);
        } else if ( angle > 175 && angle < 185) {
            groups.concat([4,5]);
        } else if ( angle >= 185 && angle <= 210) {
            groups.push(5);
        } else if ( angle > 210 && angle < 220) {
            groups.concat([5,6]);
        } else if ( angle >= 220 && angle <= 265) {
            groups.push(6);
        } else if ( angle > 265 && angle < 275) {
            groups.concat([6,7]);
        } else if ( angle >= 275 && angle <= 310) {
            groups.push(7);
        } else if ( angle > 310 && angle < 320) {
            groups.concat([7,8]);
        } else if ( angle >= 320 && angle <= 355) {
            groups.push(8);
        }

        return groups
    }
}

export default ShapeFinder;