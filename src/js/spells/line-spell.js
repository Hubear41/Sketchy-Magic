import Spell from './Spell';
import * as VectorUTIL from '../vector_util';
import { runInThisContext } from 'vm';
// import {
//     DONE,
//     EXPLODING,
//     PREP,
// } from '../global_values';
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
        this.explosionFrame = 1;
        this.minRadius = 50;
        this.maxRadius = 100;
        this.totalFrames = 80;
        this.life = 2.4;
        // this.life = Infinity;

        this.importSprite();
    }

    draw(ctx) {
        ctx.strokeStyle = 'purple';

        const startPoint = this.points[0];
        const endPoint = this.points[1];

        ctx.beginPath();
        ctx.moveTo(startPoint.x, startPoint.y);
        ctx.lineTo(endPoint.x, endPoint.y);

        ctx.closePath();
        ctx.stroke();

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

        if (explosionPath.length / 5 >= this.minRadius && explosionPath.length / 5 <= this.maxRadius) {
            this.explosionRadius = explosionPath.length / 5;
        } else if ( explosionPath.length / 5 < this.minRadius ) {
            this.explosionRadius = this.minRadius;
        } else if ( explosionPath.length / 5 > this.maxRadius) {
            this.explosionRadius = this.maxRadius;
        }

        this.explosionPosition = this.points[0];
        this.drawExplosions(ctx);
    }

    drawExplosions(ctx) {
        const { x, y } = this.explosionPosition;

        const spriteX = ((this.explosionFrame % 10) - 1) * 100;
        const spriteY = Math.floor(this.explosionFrame / 10) * 100;

        ctx.drawImage(  this.explosionSprite, 
                        spriteX, 
                        spriteY, 
                        100, 
                        100, 
                        x - (this.explosionRadius * 2.5) / 2, 
                        y - (this.explosionRadius * 2.5) / 2, 
                        this.explosionRadius * 2.5, 
                        this.explosionRadius * 2.5
        );
        
        if ( this.explosionFrame >= this.totalFrames ) {
            this.explosionPosition.x += this.explosionDx;
            this.explosionPosition.y += this.explosionDy;

            this.explosionFrame = 1;
        }

        this.explosionFrame += 2;
    }

    importSprite() {
        this.explosionSprite = new Image();
        this.explosionSprite.src = 'assets/Explosions/spritesheet.png';
    }

}

export default LineSpell;