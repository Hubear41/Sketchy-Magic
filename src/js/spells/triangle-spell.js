import Spell from './Spell';
import SnowParticles from '../particles/snow_particles';
import * as VectorUTIL from '../vector_util';
import {
    PREP,
    FREEZING,
    BEFORE_SHATTER,
    SHATTERING,
    DONE,
} from '../global_values';

class TriangleSpell extends Spell {
    constructor(spellAttr) {
        super(spellAttr);
        this.freezePoints = [];
        this.state = PREP;
        this.freezeSpeed = 5;
        this.freezeStage = 1;
        this.snowParticles = [];
        this.snowAmount = 10;
        this.mistStage = 1;
        this.mistSpeed = 10;
        this.life = 2;
        this.currMistFeather = 5;
        this.mistOpacity = 1;

        this._createSnow();
    }
    draw(ctx) {
        if (this.life <= 0) {
            this.state = SHATTERING;
        }

        if ( this.state !== SHATTERING ) {
            if (this.state === BEFORE_SHATTER || this.state === SHATTERING ) {
                this.drawMist(ctx);
            }

            const start = this.points[0];
    
            ctx.strokeStyle = this._determineStrokeColor(this.shape);
            ctx.beginPath();
            ctx.moveTo(start.x, start.y);
    
            this.points.forEach((point, idx) => {
                if (idx > 0) {
                    ctx.lineTo(point.x, point.y);
    
                    if (idx === this.points.length - 1) {
                        ctx.lineTo(start.x, start.y);
                    }
                }
            });
    
            ctx.closePath();
            ctx.stroke();

            if ( this.state === FREEZING || this.state === BEFORE_SHATTER ) {
                this.drawIce(ctx);
            }
            this.decreaseLife();
        } else {
            this.drawShatter(ctx);
        }

        if ( this.state === PREP ) {
            this.startFreezing();
        }
    }

    startFreezing() {
        this.state = FREEZING;
        const firstPoint = this.points[0];
        const leftVector = VectorUTIL.createVector(firstPoint, this.points[1]);
        const rightVector = VectorUTIL.createVector(firstPoint, this.points[2]);

        const leftDelta = {
            dx: leftVector.dx / this.freezeSpeed,
            dy: leftVector.dy / this.freezeSpeed
        };

        const rightDelta = {
            dx: rightVector.dx / this.freezeSpeed,
            dy: rightVector.dy / this.freezeSpeed,
        };

        const firstLeft = {
            x: firstPoint.x + leftDelta.dx,
            y: firstPoint.y + leftDelta.dy,
        };

        const firstRight = {
            x: firstPoint.x + rightDelta.dx,
            y: firstPoint.y + rightDelta.dy,
        };

        this.leftFreezeDelta = leftDelta;
        this.rightFreezeDelta = rightDelta;
        this.freezePoints = [ firstPoint, firstLeft, firstRight ];
    }

    drawIce(ctx) {
        ctx.fillStyle = this._determineFillColor();
        const start = this.freezePoints[0];
        
        ctx.beginPath();
        ctx.moveTo(start.x, start.y);
        
        for (let i = 1; i < this.freezePoints.length; i++) {
            const point = this.freezePoints[i];

            ctx.lineTo(point.x, point.y);

            if (i === 2) {
                ctx.lineTo(start.x, start.y);
            }
        }

        ctx.closePath();
        ctx.fill();
        if ( this.freezeStage >= this.freezeSpeed ) {
            if (this.state !== BEFORE_SHATTER) {
                setInterval(() => {
                    this.state = SHATTERING;
                }, 2000);

                this.state = BEFORE_SHATTER;
                this.startMist();
            }   
        } else {
            this._increaseLeftRightFreeze();
        }
    }

    
    drawMist(ctx) {
        const outerMistStart = this.outerMistPoints[0];
        const innerMistStart = this.innerMistPoints[0]; 

        // outer mist
        ctx.filter = `blur(${this.currMistFeather}px)`;
        ctx.fillStyle = `rgba(126, 241, 252, ${this.mistOpacity})`;
        ctx.beginPath();
        ctx.moveTo(outerMistStart.x, outerMistStart.y);

        for (let i = 1; i < this.outerMistPoints.length; i++) {
            const point = this.outerMistPoints[i];
            
            ctx.lineTo(point.x, point.y);

            if ( i === 2) {
                ctx.lineTo(outerMistStart.x, outerMistStart.y);
            }
        }

        ctx.closePath()
        ctx.fill();
        
        // inner mist
        ctx.fillStyle = `rgba(0, 128, 0, ${this.mistOpacity})`;
        ctx.beginPath();
        ctx.moveTo(innerMistStart.x, innerMistStart.y);

        for (let i = 1; i < this.innerMistPoints.length; i++) {
            const point = this.innerMistPoints[i];

            ctx.lineTo(point.x, point.y);

            if (i === 2) {
                ctx.lineTo(innerMistStart.x, innerMistStart.y);
            }
        }

        ctx.closePath()
        ctx.fill();

        ctx.filter = "none";

        this.currMistFeather += 2;
        this.mistOpacity -= 0.02;
    }
    
    drawShatter(ctx) {
        let remainingSnow = [];

        this.snowParticles.forEach( snow => {
            snow.draw(ctx);

            if ( snow.state !== DONE ) {
                remainingSnow.push(snow);
            }
        });

        if ( remainingSnow.length === 0 ) {
            this.state = DONE;
        } else {
            this.snowParticles = remainingSnow;
        }
    }
    
    startMist(ctx) {
        const mistSPoints = [];
        const mistLPoints = [];

        const smallMultiplier = 1.05;
        const largeMultiplier = 1.05;

        this.points.forEach( point => {
            const smallPoint = {
                x: point.x * smallMultiplier,
                y: point.y * smallMultiplier,
            };

            const largePoint = {
                x: point.x * largeMultiplier,
                y: point.y * largeMultiplier,
            };

            mistSPoints.push(smallPoint);
            mistLPoints.push(largePoint);
        });

        this.outerMistPoints = mistLPoints;
        this.innerMistPoints = mistSPoints
    }

    _createSnow() {
        let yAverage = 0, xAverage = 0;

        this.points.forEach( point => {
            yAverage += point.y;
            xAverage += point.x;

            for (let i = 0; i < this.snowAmount; i++) {
                const randomY = Math.random() * 20 - 10;
                const randomX = Math.random() * 20 - 10;
                let newSnow = new SnowParticles(point.x + randomX, point.y + randomY);

                this.snowParticles.push(newSnow);
            }
        });

        yAverage /= this.points.length;
        xAverage /= this.points.length;
        const center = { x: xAverage, y: yAverage };
        let newPoints =  [center];

        this.points.forEach( point => {
            const newX = (center.x + point.x) / 2;
            const newY = (center.y + point.y) / 2;
            const midpoint = {x: newX, y: newY};

            newPoints.push(midpoint);
        });
        
        newPoints.forEach( point => {
            for (let i = 0; i < this.snowAmount / 2; i++) {
                const randomX = Math.random() * (100) - 50;
                const randomY = Math.random() * (100) - 50;
    
                let newSnow = new SnowParticles(point.x + randomX, point.y + randomY);
    
                this.snowParticles.push(newSnow); 
            }
        });
    }

    _increaseLeftRightFreeze() {
        if ( this.freezeStage <= this.freezeSpeed ) {
            const leftPoint = this.freezePoints[1];
            const rightPoint = this.freezePoints[2];
            
            leftPoint.x += this.leftFreezeDelta.dx;
            leftPoint.y += this.leftFreezeDelta.dy;
            rightPoint.x += this.rightFreezeDelta.dx;
            rightPoint.y += this.rightFreezeDelta.dy;

            this.freezeStage++;
        } 
    }
};

export default TriangleSpell;   