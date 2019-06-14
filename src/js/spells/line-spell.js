import Spell from './Spell';
import * as VectorUTIL from '../vector_util';

const DONE = 'DONE';
const EXPLODING = 'EXPLODING';
const PREP = 'PREP';

class LineSpell extends Spell {
    constructor(props) {
        super(props);
        this.state = PREP;
        this.explosionSpeed = 5;
        this.explosionRadius = 50;
        this.explosionPosition = null;
        this.explosionDx = 0;
        this.explosionDy = 0;
        this.explosionStage = 0;
        this.maxRadius = 100;
        this.maxStage = 20;
        this.life = 1.2;
    }

    draw(ctx) {
        ctx.fillStyle = this._determineFillColor(this.shape);
        ctx.strokeStyle = this._determineStrokeColor(this.shape);

        const startPoint = this.points[0];
        const endPoint = this.points[1];

        ctx.beginPath();
        ctx.moveTo(startPoint.x, startPoint.y);
        ctx.lineTo(endPoint.x, endPoint.y);

        ctx.closePath();
        ctx.stroke();
        ctx.fill();

        if ( this.state === EXPLODING) {
            this.drawExplosions(ctx);
        } else {
            this.startExplosions(ctx);
        }

        this.decreaseLife();

        if ( this.life <= 0 ){
            this.state = DONE;
        }
    }

    startExplosions(ctx) {
        this.state = EXPLODING;
        const explosionPath = VectorUTIL.createVector(this.points[0], this.points[1]);
        
        this.explosionDx = explosionPath.dx / this.explosionSpeed;
        this.explosionDy = explosionPath.dy / this.explosionSpeed;

        this.explosionRadius = explosionPath.length / 5 > this.maxRadius ? this.maxRadius : explosionPath.length / 5;
        this.explosionPosition = this.points[0];
        this.drawExplosions(ctx);
    }

    drawExplosions(ctx) {
        const orangeStage = this.explosionStage + 5 > this.maxStage ? this.maxStage : this.explosionStage + 5;
        const yellowStage = this.explosionStage + 2 > this.maxStage ? this.maxStage : this.explosionStage + 2;
        const clearRadius = this.explosionStage * this.explosionRadius / this.maxStage;
        const orangeRadius = orangeStage * this.explosionRadius / this.maxStage;
        const yellowRadius = yellowStage * this.explosionRadius / this.maxStage;
        
        ctx.filter = "blur(2px)";  // "feather"

        ctx.beginPath();
        ctx.arc(this.explosionPosition.x, this.explosionPosition.y, this.explosionRadius, 0, 2 * Math.PI);
        ctx.closePath();
        ctx.fill();

        ctx.filter = "blur(10px)"; // inner feather

        ctx.beginPath();
        ctx.fillStyle = 'orange'
        ctx.arc(this.explosionPosition.x, this.explosionPosition.y, orangeRadius, 0, 2 * Math.PI);
        ctx.closePath();
        ctx.fill();

        ctx.beginPath();
        ctx.fillStyle = 'yellow'
        ctx.arc(this.explosionPosition.x, this.explosionPosition.y, yellowRadius, 0, 2 * Math.PI);
        ctx.closePath();
        ctx.fill();
        // ctx.stroke();

        ctx.beginPath(); 
        ctx.fillStyle = "darkgreen";
        ctx.arc(this.explosionPosition.x, this.explosionPosition.y, clearRadius, 0, 2 * Math.PI);
        ctx.closePath();
        ctx.fill();

        ctx.filter = "none";
        
        if ( this.explosionStage === this.maxStage ) {
            this.explosionPosition.x += this.explosionDx;
            this.explosionPosition.y += this.explosionDy;

            this.explosionStage = 0;
        }

        this.explosionStage++;
    }

}

export default LineSpell;