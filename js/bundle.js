/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./js/entry.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./js/Spell.js":
/*!*********************!*\
  !*** ./js/Spell.js ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
class Spell {
    constructor({points, position, shape}) {
        this.shape = shape;
        this.position = position;
        this.points = points;
        this.life = 1;
        this.decay = 0.1;
    }
}

/* harmony default export */ __webpack_exports__["default"] = (Spell);

/***/ }),

/***/ "./js/entry.js":
/*!*********************!*\
  !*** ./js/entry.js ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game */ "./js/game.js");


document.addEventListener('DOMContentLoaded', () => {
    let paperCanvas = document.getElementById('paperCanvas');
    let mainCanvas = document.getElementById('mainCanvas');
    paper.setup(paperCanvas);

    const game = new _game__WEBPACK_IMPORTED_MODULE_0__["default"](mainCanvas, paperCanvas);
    game.start();
});



/***/ }),

/***/ "./js/game.js":
/*!********************!*\
  !*** ./js/game.js ***!
  \********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _shape_finder__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./shape_finder */ "./js/shape_finder.js");


class Game {
    constructor(canvas, paper) {
        this.canvas = canvas;
        this.paper = paper; 

        this.mouseTool = new Tool();
        this.spellFinder = new _shape_finder__WEBPACK_IMPORTED_MODULE_0__["default"](this.mouseTool, mainCanvas);

        // this.drawBg = this.drawBg.bind(this);

        document.addEventListener('mouseup', () => {
            this.spell = this.spellFinder.currentSpell;
        });
    }

    start() {
        setInterval(this.draw, 1000);
    }

    drawBg() {
        const ctx = this.canvas.getContext('2d');

        ctx.beginPath();
        ctx.rect(canvas.width / 2, canvas.height / 2, 20, 10);
        ctx.fillStyle = "#C1B8B6";
        ctx.fill();
        ctx.closePath();
        ctx.stroke();
    }

    drawSpells() {
        if (!this.spell) {
            return
        }

        // this.spell.draw();
        // this.spell.decreaseLife();
    }

    draw() {
        this.drawBg();
        this.drawSpells();
    }
}

/* harmony default export */ __webpack_exports__["default"] = (Game);

/***/ }),

/***/ "./js/shape_finder.js":
/*!****************************!*\
  !*** ./js/shape_finder.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Spell__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Spell */ "./js/Spell.js");


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
            this.drawShapeOnCanvas();
            this.resetPath();
        }
    }

    drawShapeOnCanvas() {
        this.pointsArr = this.removeRedundantPoints();

        this.determineShape(this.pointsArr);

        if ( this.shape ) {
            this.drawSimplifiedShape(this.pointsArr);
            const spellAttr = {
                position: this.position,
                points: this.pointsArr,
                shape: this.shape,
            }

            this.currentSpell = new _Spell__WEBPACK_IMPORTED_MODULE_0__["default"](spellAttr);
        }
    }

    determineShape(allPoints) {
        // debugger
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

    }

    checkDeltaChange() {
        const currVector = this.createVector(this.prevPoint, this.currPoint);

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

    createVector(point1, point2) {
        const dx = point2.x - point1.x;
        const dy = point2.y - point1.y;
        const radians = Math.atan2(dy, dx);
        const angle = radians * (180 / Math.PI);
        const length = Math.sqrt(Math.pow(dx,2) + Math.pow(dy,2));
        const direction = this._findDirection(angle);

        return { dx, dy, angle, direction, length };
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

            const currVector = this.createVector(prevPoint, currPoint);
            const nextVector = this.createVector(prevPoint, nextPoint);

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
            const differenceVector = this.createVector(pointB, pointA);
            if ( idx === 0 ) {
                distanceMargin *= 2;
            }
            if ( differenceVector.length <= distanceMargin ) {
                tooClose = true;
            }
        });

        return tooClose;
    }

    _findDirection(angle) {
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

/* harmony default export */ __webpack_exports__["default"] = (ShapeFinder);

/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map